import React, {Component} from 'react';
import fsUtils from '../../utils/fsUtils';
import styles from './ImageAttachmentView.less';
import ImagePreviewNewModal from './ImagePreviewNewModal';
import DataUtils from '../../utils/dataUtils';

export default class ImageAttachmentView extends Component {
  state = {
    imagePreviewModalVisible: false,
    selectImageIndex:null,
  };

  handleAttachmentItemClick = (attachmentItem,idx) => {
    this.setState({
      imagePreviewModalVisible: true,
      attachmentItem,
      selectImageIndex:idx,
    });
  };

  handleImagePreviewOk = () => {
    this.setState({
      imagePreviewModalVisible: false,
    });
  };

  handleImagePreviewCancel = () => {
    this.setState({
      imagePreviewModalVisible: false,
    });
  };

  render () {
    const {attachmentList} = this.props;
    const {
      imagePreviewModalVisible,
      attachmentItem,
      selectImageIndex,
    } = this.state;

    return (
      <div className={styles.gallery}>
        <ul className={styles.galleryList}>
          {
            attachmentList.map((attachment,idx) => (
              <li className={styles.galleryItem} key={DataUtils.generateKey(idx)} onClick={this.handleAttachmentItemClick.bind(this, attachment,idx)}>
                <img className={styles.galleryItemImage} src={`${fsUtils.getViewFileAddress(attachment.fileUuid)}`} alt={attachment.fileName} />
              </li>
            ))
          }
        </ul>

        {
          imagePreviewModalVisible && (
            <ImagePreviewNewModal
              visible={imagePreviewModalVisible}
              onOk={this.handleImagePreviewOk}
              onCancel={this.handleImagePreviewCancel}
              imageUuid={attachmentItem.fileUuid}
              imageArray={attachmentList}
              selectImageIndex={selectImageIndex}
            />
          )
        }
      </div>
    )
  }
}
