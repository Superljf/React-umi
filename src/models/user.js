import { query as queryUsers, queryCurrent,inquireOperationCodeListAccount } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getUrlParamReg } from '../utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    currentUserInfo: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      if(window.location.hash.includes('/third/sms')){
        yield put({
          type: 'saveState',
          payload: {currentUser: {name: localStorage.getItem('fullName')}},
        });
        return;
      }

      const response = yield call(queryCurrent);
      if(response.status === "200"){
        localStorage.setItem('fullName', response.datas[0].name);
        localStorage.setItem('accountId', response.datas[0].accountId);
      }
      const codeResponse = yield call(inquireOperationCodeListAccount);
      if(codeResponse.status === "200"){
        const { operationCode } = codeResponse.datas[0];
        if(operationCode.indexOf('YX_RS_ADMIN') !== -1){ // 管理员
          setAuthority('YX_RS_ADMIN');
        }else{
          setAuthority('');
        }
      }
      
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });

      reloadAuthorized();
    },

    *thirdCheck({ payload }, {call, put }){
      const sid = getUrlParamReg('sid');
      if(sid && !localStorage.setItem('sid', sid)){
        yield localStorage.setItem('sid', sid);
      }
      const response = yield call(queryCurrent, payload);

      if(response.status === "200"){
        localStorage.setItem('fullName', response.datas[0].name);
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      reloadAuthorized();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    // saveCurrentUser(state, action) {
    //   return {
    //     ...state,
    //     currentUser: action.payload || {},
    //   };
    // },
    saveState(state, { payload }){
      return { ...state, ...payload };
    },

    saveCurrentUser(state, action) {
      const response = action.payload.datas[0];
      return {
        ...state,
        currentUser: {name: response.name} || {},
        currentUserInfo: response,
      };
    },

    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
