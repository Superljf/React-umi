import request from '@/utils/request';
import networkUtils from '@/utils/networkUtils';

/**
 * 查询单位下的下属单位
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireSubordinateUnitListTenant(params) {
  return request(networkUtils.getAction('inquireSubordinateUnitListTenant'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
      keyword: params.keyword,
      directly: params.directly,
      zoneId: params.zoneId,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    }),
  });
}

/**
 * 查询单位的上级单位
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireSuperiorUnitListTenant(params) {
  return request(networkUtils.getAction('inquireSuperiorUnitListTenant'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
      keyword: params.keyword,
      directly: params.directly,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    }),
  });
}

/**
 * 查询同级单位列表
 * @param params
 * @returns {Promise<Object>}
 */
export async function inquireSameLevelCompanyListGlobal(params) {
  return request(networkUtils.getAction('inquireSameLevelCompanyListGlobal'), {
    method: 'POST',
    body: networkUtils.getRequestBody({
      sameLevelCompanyName: params.sameLevelCompanyName,
      tenantId: params.tenantId,
    }),
  });
}
