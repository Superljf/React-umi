import networkUtils from '@/utils/networkUtils';
import { inquireSubordinateUnitListTenant,inquireSuperiorUnitListTenant } from '../services/tenant';

export default {
  namespace: 'tenantSelector',

  state: {
    loading: false,
    loadingView: true,
    selectAll: false,
    superiorUnitDataList: [],
    dataList: [],
    pagination: {...networkUtils.pagination},
    superiorUnitPagination: {...networkUtils.pagination},
  },

  effects: {
    *fetchList({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(inquireSubordinateUnitListTenant, payload);
      if (networkUtils.isSuccess(response)) {
        const pagination = networkUtils.getPagination(response);

        const { selectedIdList } = payload;

        yield put({
          type: 'dataList',
          payload: {
            pagination,
            dataList: response.datas,
            selectedIdList,
          },
        });
      }

      yield put({
        type: 'changeLoadingView',
        payload: false,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchSuperiorUnitList({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(inquireSuperiorUnitListTenant, payload);
      if (networkUtils.isSuccess(response)) {
        const superiorUnitPagination = networkUtils.getPagination(response);

        const { selectedIdList } = payload;

        yield put({
          type: 'superiorUnitDataList',
          payload: {
            superiorUnitPagination,
            superiorUnitDataList: response.datas,
            selectedIdList,
          },
        });
      }

      yield put({
        type: 'changeLoadingView',
        payload: false,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    dataList(state, action) {
      let {dataList} = state;

      const {
        pagination,
        selectedIdList,
      } = action.payload;

      if (pagination.current === 1) {
        ({dataList} = action.payload);
      } else {
        dataList.push(...action.payload.dataList);
      }

      if (selectedIdList && selectedIdList.length) {
        dataList = dataList.map(dataItem => {
          const {
            secondaryTenantId,
          } = dataItem;

          return {
            ...dataItem,
            checked: selectedIdList.includes(secondaryTenantId),
          }
        });
      }

      return {
        ...state,
        pagination,
        dataList,
        selectAll: !dataList.some(({ checked }) => !checked),
        superiorUnitDataList: [],
        superiorUnitPagination: {...networkUtils.pagination},
      }
    },
    superiorUnitDataList(state, action) {
      let { superiorUnitDataList } = state;

      const {
        superiorUnitPagination,
        selectedIdList,
      } = action.payload;

      if (superiorUnitPagination.current === 1) {
        ({superiorUnitDataList} = action.payload);
      } else {
        superiorUnitDataList.push(...action.payload.superiorUnitDataList);
      }

      if (selectedIdList && selectedIdList.length) {
        superiorUnitDataList = superiorUnitDataList.map(dataItem => {
          const {
            primaryTenantId,
          } = dataItem;
          
          return {
            ...dataItem,
            checked: selectedIdList.includes(primaryTenantId),
          }
        });
      }

      return {
        ...state,
        superiorUnitPagination,
        superiorUnitDataList,
        selectAll: !superiorUnitDataList.some(({ checked }) => !checked),
        pagination:{...networkUtils.pagination},
        dataList:[],
      }
    },
    changeLoadingView(state, action) {
      return {
        ...state,
        loadingView: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeSuperiorUnitSelect(state, action) {
      const { tenantId, checked } = action.payload;

      const { superiorUnitDataList } = state;

      const newList =  superiorUnitDataList.map((dataItem) => {
        const { primaryTenantId } = dataItem;
        if (primaryTenantId === tenantId) {
          return {
            ...dataItem,
            checked,
          }
        } else {
          return dataItem;
        }
      });

      return {
        ...state,
        superiorUnitDataList: newList,
        selectAll: !newList.some(dataItem => !dataItem.checked),
      };
    },
    changeSelect(state, action) {
      const { tenantId, checked } = action.payload;

      const { dataList } = state;

      const newList =  dataList.map((dataItem) => {
        const { secondaryTenantId } = dataItem;
        if (secondaryTenantId === tenantId) {
          return {
            ...dataItem,
            checked,
          }
        } else {
          return dataItem;
        }
      });

      return {
        ...state,
        dataList: newList,
        selectAll: !newList.some(dataItem => !dataItem.checked),
      };
    },
    changeSelectAll(state, action) {
      const { checked } = action.payload;

      const { dataList } = state;

      return {
        ...state,
        dataList: dataList.map((dataItem) => {
          return {
            ...dataItem,
            checked,
          }
        }),
        selectAll: checked,
      };
    },
    changeSelectSuperiorUnitAll(state, action) {
      const { checked } = action.payload;

      const { superiorUnitDataList } = state;

      return {
        ...state,
        superiorUnitDataList: superiorUnitDataList.map((dataItem) => {
          return {
            ...dataItem,
            checked,
          }
        }),
        selectAll: checked,
      };
    },
  },
};
