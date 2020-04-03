import React, {Component} from 'react';
import { Icon } from 'antd';
import styles from './AttachmentView.less';
import fsUtils from '../../utils/fsUtils';
import DataUtils from '../../utils/dataUtils';

export default class AttachmentView extends Component {
  render() {
    const {attachmentList} = this.props;

    return (
      <div className={styles.attachmentList}>
        {
          attachmentList.map((attachmentItem,idx) => (
            <a
              key={DataUtils.generateKey(idx)}
              href={fsUtils.getFilePreviewAddress(attachmentItem.fileUuid, attachmentItem.fileName)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.attachmentItem} title={attachmentItem.fileName}>
                <span className={styles.attachmentItemIcon}><Icon type="link" /></span>

                <span className={styles.attachmentItemText}>{attachmentItem.fileName}</span>
              </div>
            </a>
          ))
        }
      </div>
    )
  }
}
