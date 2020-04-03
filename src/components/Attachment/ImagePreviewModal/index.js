import React, {Component} from 'react';
import { Button, Modal } from 'antd';
import fsUtils from '../../../utils/fsUtils';
import styles from './index.less';

export default class ImagePreviewModal extends Component {
  render() {
    const {imageUuid, visible, onOk, onCancel} = this.props;
    return (
      <Modal
        title="图片预览"
        visible={visible}
        onCancel={onOk}
        footer={[
          <Button key="submit" type="primary" onClick={onCancel}>
            关闭
          </Button>,
        ]}
      >
        <div className={styles.imagePreview}>
          <img className={styles.imagePreviewIcon} src={`${fsUtils.getViewFileAddress(imageUuid)}`} alt="图片" />
        </div>
      </Modal>
    )
  }
}
