// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('study-worker-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('study-worker-authority', JSON.stringify(proAuthority));
}

/**
 *
 * @param authorityArray 需要的权限['ART_SUPER_MANAGER']
 * @param renderDom 要渲染的元素  <Button type='primary' onClick={() => {alert('设置管理员')}}>设置管理员</Button>)
 * @returns {*}
 */
export function renderAuthorityDom(authorityArray, renderDom){
  const authoritys = getAuthority();
  for (let i = 0; i <authorityArray.length ; i+=1) {
    if(authoritys.indexOf(authorityArray[i]) > -1){
      return renderDom;
    }
  }
  return null;
}
