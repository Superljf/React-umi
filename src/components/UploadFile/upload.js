import React from 'react';
import { Button, Icon, message, Modal, Upload } from 'antd';
import { fsPath } from '../../utils/constants';
import fsUtils from '../../utils/fsUtils';
import styles from './styles.less';

class UploadFile extends React.PureComponent {
  state = {
    fileList: [],
    disabled: false,
    maskShow: false,
    showNumber: null,
  };

  componentDidMount() {
    const { defaultFileList, maxAttachmentCount } = this.props;
    const { fileList } = this.state;
    const oldFileList = this.initDefaultFileList(defaultFileList);
    this.setState({
      fileList: fileList.concat(oldFileList),
      disabled: maxAttachmentCount && defaultFileList && defaultFileList.length >= maxAttachmentCount,
    });
  }

  initDefaultFileList = (fileList) => {
    const { listType } = this.props;
    if (fileList) {
      const date = new Date();
      const defaultFileList = [];
      fileList.forEach((value, index) => {
        const fileItem = {}; // fileItem 给upload组件回显用
        fileItem.uid = `${date.getTime()}-${index}`;
        fileItem.name = value.fileName;
        fileItem.status = 'done';
        if(listType === 'picture-card'){
          fileItem.url = `${fsPath}viewPic.file?fileUuid=${value.fileUuid}`;
        }else{
          fileItem.url = `${fsPath}downloadFile.file?fileUuid=${value.fileUuid}&filename=${encodeURIComponent(value.fileName)}`;
        }
        const response = {};
        const dataArray = [];
        const fileData = {}; // fileData 是后台数据库的文件格式
        fileData.fileUuid = value.fileUuid;
        fileData.fileName = value.fileName;
        fileData.fileSize = value.fileSize;
        fileData.md5 = value.md5;
        dataArray.push(fileData);
        response.data = dataArray;
        fileItem.response = response;
        defaultFileList.push(fileItem);
      });
      return defaultFileList;
    }
    return [];
  };

  beforeUpload = file => {
    let { singleSize } = this.props;

    singleSize = singleSize || 100;
    if (file.size > singleSize * 1024 * 1024) {
      message.error(`单个文件最大${singleSize}M`);
      return false;
    }
  };

  buildFileListResult = (fileList) => {
    const resultFileList = [];
    fileList.forEach((value) => {
      if(value && value.status === 'done'){
        const resultFileItem = {};
        resultFileItem.fileName = value.response.data[0].fileName;
        resultFileItem.fileSize = value.response.data[0].fileSize;
        resultFileItem.fileUuid = value.response.data[0].fileUuid;
        resultFileItem.md5 = value.response.data[0].md5;
        resultFileList.push(resultFileItem);
      }
    });
    return resultFileList;
  };

  uploadOnChange = uploadInfo => {
    const { maxAttachmentCount } = this.props;

    if (maxAttachmentCount && uploadInfo.fileList.length > maxAttachmentCount) {
      message.error(`最多上传${maxAttachmentCount}个附件`);
      return false;
    }

    const { fileList } = uploadInfo;
    this.setState({
      fileList: [...fileList],
      disabled: maxAttachmentCount && uploadInfo.fileList.length >= maxAttachmentCount,
    });

    const resultFileList = this.buildFileListResult(fileList);

    const { fileListCallback } = this.props;
    fileListCallback(resultFileList);
  };

  handlePreview = async file => {
    const fileUuid = file.response.data[0].fileUuid || '';
    const fileName = file.response.data[0].fileName || '';
    if (fileUuid) {
      fsUtils.gotoFilePreview(fileUuid, fileName);
    }
  };

  handlePictureCardOnMoveEnter = (index) => {
    this.setState({
      maskShow:true,
      showNumber: index,
    })
  }

  handlePictureCardOnMoveLeave = () => {
    this.setState({
      maskShow:false,
      showNumber: null,
    })
  }

  handleRemoveFile = (index) => {
    const { fileList } = this.state;
    fileList.splice(index,1);
    this.setState({
      fileList,
    });

    const resultFileList = this.buildFileListResult(fileList);

    const { fileListCallback } = this.props;
    fileListCallback(resultFileList);
  }

  renderPictureCard (fileList) {
    const { maskShow,showNumber } = this.state;
    return (
      <React.Fragment>
        {fileList.map((item,idx) => {
          if(item.status !== 'done'){
            return
          }
          return(
            <div
              className={styles.pictureCardDiv}
              onMouseLeave={this.handlePictureCardOnMoveLeave}
              onMouseEnter={this.handlePictureCardOnMoveEnter.bind(this,idx)}
              key={`PICTURE_CARD_KEY_${idx + 1}`}
            >
              {showNumber === idx && maskShow && (
              <div className={styles.pictureCardMask}>
                <Button icon="eye" type='link' onClick={this.handlePreview.bind(this,item)} />
                <Button icon="delete" type='link' onClick={this.handleRemoveFile.bind(this,idx)} />
              </div>
              )}
              <div className={styles.imgBorder}>
                <img style={{maxWidth:'100%',height:'124px'}} src={item.url ? item.url : `${fsPath}viewPic.file?fileUuid=${item.response.data[0].fileUuid}`} alt={item.fileName} />
              </div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  /**
   * accept 限制上传支持格式  : (String)example: '.jpg, .gif, .mp3'
   * buttonContent 按钮名字，默认‘上传附件’
   * fileList 父级组件入参：用来显示已传的文件
   * defaultFileList 上传组件被初始化时回显的已上传文件
   * maxAttachmentCount 限制最多可上传文件个数 beforeUpload 方法中有用
   * @returns {*}
   */
  render() {
    const { buttonContent, listType, multiple, maxAttachmentCount, accept } = this.props;
    const { disabled, fileList, previewVisible, previewImage } = this.state;
    let btnContent;
    if (disabled && maxAttachmentCount) {
      btnContent = `最多可上传${maxAttachmentCount}个文件`;
    } else if (buttonContent){
      btnContent = buttonContent;
    } else {
      btnContent = '上传附件';
    }
    return (
      <React.Fragment>
        {listType === 'picture-card' && this.renderPictureCard(fileList)}
        <Upload
          accept={accept || ''}
          fileList={fileList}
          action={`${fsPath}uploadFile.json`}
          listType={listType || 'text'}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.uploadOnChange}
          showUploadList={listType !== 'picture-card'}
          multiple={multiple || false}
        >
          {
            listType === 'picture-card' ?
              <Icon type="plus" /> :
            (
              <Button disabled={disabled}>
                <Icon type="upload" />
                {btnContent}
              </Button>
            )
          }
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default UploadFile;
