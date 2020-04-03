import React from 'react';
import { Button, Icon, message, Upload } from 'antd';
import { fsPath } from '../../utils/constants';
import fsUtils from '../../utils/fsUtils'

import style from './styles.less'

class UploadFile extends React.PureComponent{
  state = {
    fileList: [],
    stopUid: [],
  };

  // componentWillReceiveProps(nextProps) {
  //   const { defaultFileList } = nextProps;
  //   if(defaultFileList && defaultFileList.length > 0){
  //     const { fileList } = this.state;
  //     const stateFileUuidList = fileList.map(item => {
  //       return item.fileUuid;
  //     });
  //     const newDefaultFileList = defaultFileList.filter(item => {
  //       return stateFileUuidList.indexOf(item.fileUuid) < 0;
  //     });
  //     if(newDefaultFileList.length === 0){
  //       return;
  //     }
  //     const newFileList = [...fileList, ...newDefaultFileList];
  //     this.setState({fileList: newFileList}, () => {
  //       this.forceUpdate();
  //     });
  //   }
  // }

  componentDidMount() {
    const { defaultFileList } = this.props;
    if(defaultFileList && defaultFileList.length > 0){
      const { fileList } = this.state;
      const stateFileUuidList = fileList.map(item => {
        return item.fileUuid;
      });
      const newDefaultFileList = defaultFileList.filter(item => {
        return stateFileUuidList.indexOf(item.fileUuid) < 0;
      });
      if(newDefaultFileList.length === 0){
        return;
      }
      const newFileList = [...fileList, ...newDefaultFileList];
      this.setState({fileList: newFileList}, () => {
        this.forceUpdate();
      });
    }
  }


  removeFile = (fileUuid) => {
    const { fileList } = this.state;
    const newFileList = fileList.filter((file) => {
      return file.fileUuid !== fileUuid;
    });
    const { fileListCallback } = this.props;
    this.setState({fileList: newFileList});
    fileListCallback(newFileList);
  };

  filePreview = (file) => {
    fsUtils.gotoFilePreview(file.fileUuid, file.fileName);
  };

  uploadOnChange = info => {
    let { fileList } = info;
    fileList = fileList.map(file => {
      const newFile = file;

      if (file.response) {
        const data = file.response.data[0];
        newFile.url = `${fsPath}downloadFile.file?fileUuid=${data.fileUuid}&fileName=${
          data.fileName
          }`;
      }
      return newFile;
    });
    fileList = fileList.filter(file => {
      if (file.response) {
        return file.response.flag === 'SUCCESS';
      }
      return true;
    });

    fileList = fileList.map(file => {
      const newFile = file;
      if (file.response) {
        return file.response.data[0];
      }

      return newFile;
    });

    if (fileList.length >= 0) {
      const copyState = {...this.state};
      const fileUuidList = fileList.map(item => {
        return item.fileUuid;
      });

      const defaultFileList = copyState.fileList.filter(item => {
        return item.fileUuid && item.fileName && fileUuidList.indexOf(item.fileUuid) < 0;
      });
      this.setState({ fileList: [...defaultFileList, ...fileList] });

      const { fileListCallback } = this.props;
      const successList = fileList.filter(item => {
        return item.fileUuid && item.fileName;
      });

      if(successList.length){
        const stateFileList = this.state.fileList;
        fileListCallback([...stateFileList]);
      }

    }
  };

  beforeUpload = file => {
    const { fileList } = this.state;
    let {singleSize } = this.props;
    const { attachCount } = this.props;
    singleSize = singleSize || 100;
    if (file.size > singleSize * 1024 * 1024) {
      message.error(`单个文件最大${singleSize}M`);
      this.setStopUid(file.uid);
      return false;
    }
    if (attachCount && fileList.length > attachCount) {
      message.error(`最多上传${attachCount}个附件`);
      this.setStopUid(file.uid);
      return false;
    }
  };

  setStopUid = (uid) => {
    const {stopUid} = this.state;
    stopUid.push(uid);
    this.setState({stopUid});
  };

  render() {
    const {uploadProps, uploadBtnShow } = this.props;
    const btnShow = uploadBtnShow === undefined ? true : uploadBtnShow;
    const {  fileList, stopUid } = this.state;
    const fileArray = fileList.map((file) => {
      if(file.uid){
        if(stopUid.indexOf(file.uid) !== -1){
          return null;
        }
        return(
          <div className={style.underLine} key={file.uid}>
            <div>
              <span>
                <Icon type="paper-clip" />
                <span className={style.fileNameColor}>{file.fileName}</span>
              </span>
              <span className={style.actionTab}>
                正在上传...
              </span>
            </div>
          </div>
        );
      }
      return(
        <div className={style.underLine} key={file.fileUuid ? file.fileUuid : file.uid}>
          <div>
            <a href={`${fsPath}downloadFile.file?fileUuid=${file.fileUuid}&filename=${file.fileName}`}>
              <span>
                <Icon type="paper-clip" />
                <span className={style.fileNameColor}>{file.fileName}</span>
              </span>
            </a>
            <span className={style.actionTab}>
              {btnShow ? (<span onClick={this.removeFile.bind(this, file.fileUuid)} className={style.actionLabel}>删除</span>): null}
              &nbsp; &nbsp;
              {btnShow ? <span>|</span>: null}
              &nbsp;&nbsp;
              <span onClick={this.filePreview.bind(this, file)} className={style.actionLabel}>预览</span>
            </span>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        {fileArray}
        <Upload
          action={`${fsPath}uploadFile.json`}
          listType='picture'
          onChange={this.uploadOnChange}
          beforeUpload={this.beforeUpload}
          showUploadList={false}
          {...uploadProps}
        >
          {btnShow ? (
            <Button>
              <Icon type="upload" />
              上传附件
            </Button>
            ): null
          }
        </Upload>
      </React.Fragment>
    );
  }
}

export default UploadFile;
