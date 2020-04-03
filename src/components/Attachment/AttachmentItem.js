import React, {Component} from 'react';
import {Icon} from 'antd';
import styles from './AttachmentItem.less';

export default class AttachmentItem extends Component {
  render() {
    const {attachment, onItemRemove} = this.props;
    const {imageUrl} = attachment;

    return (
      <div className={styles.attachmentItem}>
        <img className={styles.attachmentItemImg} src={imageUrl} alt="附件" />

        <span className={styles.attachmentItemDelIcon} onClick={() => onItemRemove(attachment)}>
          <Icon type="close-circle" />
        </span>
      </div>
    );
  }
}
