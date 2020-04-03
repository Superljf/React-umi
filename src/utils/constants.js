
const loginHome = 'http://ehall.qzgymy.cn';

const requestPath = {
  project: 'store',
  version1: 'v1.0',
};

const fsPath = '/fs/api/v1.0/';

export const constants = {
  jurisdiction:['CountyLevel','SchoolAdmin','Teacher'],
  trainingState:['全部状态','报名中','未开始','培训中','已结束'],
  trainingStateColor:['','#33cc66','#ffaa00','#00b5ff','#5a5a5a'],
  applyState:['全部状态','审核中','已报名','培训中','已取消','已结束','不通过'],
  applyStateColor:['','#666666','#3c6','#00a6ff','#999999','#5a5a5a','#ff6666'],
  teachingType:['全部','幼儿园','小学','初中','高中','特教','职业学校','培训学校','其他学校'],
  signState:['全部状态','待审核','已通过','不通过'],
  signStateAll:['全部状态','待审核','已通过','不通过','校级待审核','校级已通过','县级待审核'],
  signStateColor:['','#5a5a5a','#24a681','#f5222d','#5a5a5a','#24a681','#5a5a5a'],
  homeworkSubmitStatus: ['全部状态', '未提交', '已提交'],
  submitStatusColor: ['','#5a5a5a','#24a681'],
  gender:['', '男', '女'],
};

export const formItemLayout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 20
  },
};

export  {
  requestPath,
  fsPath,
  loginHome,
};
