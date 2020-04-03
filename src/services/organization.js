import { sysConstants } from '@/utils/sysConstants';
import request from '@/utils/request';
import networkUtils from '@/utils/networkUtils';


/**
 * 员工选择器
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireOrganizationEmployeeListTenant(params) {
  return request(networkUtils.getAction('inquireOrganizationEmployeeListTenant'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
      pOrganizationId: params.pOrganizationId,
    }),
  });
}

/**
 * 员工列表
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireEmployeeListTenant(params) {
  return request(networkUtils.getAction('inquireEmployeeListTenant'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
      accountStatus: 1,
      keyword: params.keyword,
      pageSize: sysConstants.MAX_INQUIRE_PAGE_SIZE,
      pageIndex: 1,
    }),
  });
}

/**
 * 查询单位组织树
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireOrganizationTreeTenant() {
  return request(networkUtils.getAction('inquireOrganizationTreeTenant'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
    }),
  });
}

/**
 * 查询下属单位组织树
 * @returns {Promise<Object>}
 */
export async function inquireChargeOrganizationTreeGlobal() {
  return request(networkUtils.getAction('inquireChargeOrganizationTreeGlobal'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
    }),
  });
}
