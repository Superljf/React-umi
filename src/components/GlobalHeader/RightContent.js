import React, { PureComponent } from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import ProjectionIcon from '../ProjectionIcon'

@connect(({ user }) => ({ user }))
class GlobalHeaderRight extends PureComponent {

  componentDidMount() {
    const { currentUser } = this.props;
    if(currentUser.name){
      localStorage.setItem('fullName', currentUser.name);
    }
  };

  goToHome = () => {
    window.location.href = '/home/3.0/#/workbench';
  };

  render() {
    const {
      currentUser,
      theme,
      user : { currentUserInfo },
    } = this.props;

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className} style={{display: 'flex', alignItems: 'center'}}>
        <span className={`${styles.action} ${styles.account}`} onClick={this.goToHome}>
          <Icon type="home" style={{fontSize: '16px',color: '#969696',}} />
        </span>

        {currentUserInfo.photoId ?
          <img alt='' src={`/fs/api/v1.0/viewPic.file?fileUuid=${currentUserInfo.photoId}`} style={{height: '30px',width: '30px',border: '1px solid #ffffff',borderRadius: '50%',backgroundColor: '#ffffff'}} /> :
        (
          <span style={{fontSize: '25px'}}>
            <ProjectionIcon type='iconavatar_default' />
          </span>
        )}
        {currentUser.name ? (
          <span className={`${styles.action} ${styles.account}`}>
            <span className={styles.name}>{currentUser.name}</span>
          </span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
export default GlobalHeaderRight
