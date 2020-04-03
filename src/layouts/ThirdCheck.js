import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import { getUrlParamReg } from '../utils/utils';

@connect(({user}) => ({...user}))
class ThirdCheck extends React.PureComponent{
  componentDidMount() {
    const jc = getUrlParamReg('jc');
    const {dispatch} = this.props;
    const showSms = jc === '/third/sms' ? 1 : 0;
    dispatch({
      type: 'user/thirdCheck',
      payload: {showSms},
    }).then(() => {
      const { currentUser } = this.props;
      if(currentUser){
        router.push(jc);
      }
    });
  }

  render() {
    return (
      <div>
        身份验证中...
      </div>
    );
  }
}

export default ThirdCheck;
