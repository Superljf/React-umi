import React, { Component } from 'react';
import apkIcon from '../../assets/Icon/apk_icon_50px.png';
import excelIcon from '../../assets/Icon/excel_icon_50px.png';
import pdfIcon from '../../assets/Icon/pdf_icon_50px.png';
import picIcon from '../../assets/Icon/pic_icon_50px.png';
import pptIcon from '../../assets/Icon/ppt_icon_50px.png';
import psIcon from '../../assets/Icon/ps_icon_50px.png';
import txtIcon from '../../assets/Icon/txt_icon_50px.png';
import unknownIcon from '../../assets/Icon/unknown_icon_50px.png';
import videoIcon from '../../assets/Icon/video_icon_50px.png';
import voiceIcon from '../../assets/Icon/voice_icon_50px.png';
import wordIcon from '../../assets/Icon/word_icon_50px.png';
import zipIcon from '../../assets/Icon/zip_icon_50px.png';
import fsUtils from '../../utils/fsUtils';
import styles from './index.less';


class ExtensionIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getFileIcon = (fileName) => {
    const extMap = {
      "apk": apkIcon,
      "xls": excelIcon,
      "csv": excelIcon,
      "xlsx": excelIcon,
      "ods": excelIcon,
      "ppt": pptIcon,
      "pptx": pptIcon,
      "odp": pptIcon,
      "pdf": pdfIcon,
      "jpg": picIcon,
      "png": picIcon,
      "jpeg": picIcon,
      "gif": picIcon,
      "tif": picIcon,
      "tiff": picIcon,
      "psd": psIcon,
      "txt": txtIcon,
      "mp4": videoIcon,
      "avi": videoIcon,
      "flv": videoIcon,
      "rmvb": videoIcon,
      "rm": videoIcon,
      "3gp": videoIcon,
      "mov": videoIcon,
      "asf": videoIcon,
      "wmv": videoIcon,
      "mp3": voiceIcon,
      "wav": voiceIcon,
      "flac": voiceIcon,
      "ape": voiceIcon,
      "ogg": voiceIcon,
      "doc": wordIcon,
      "docx": wordIcon,
      "odt": wordIcon,
      "zip": zipIcon,
      "7z": zipIcon,
      "rar": zipIcon,
      "gz": zipIcon,
      "bz": zipIcon,
      "tar": zipIcon,
    };
    const { iconSize } = this.props;
    const ext = fileName.replace(/.*\.(\w+)/, "$1");

    let imgSrc;
    if (!ext) {
      imgSrc = unknownIcon;
    } else {
      imgSrc = extMap[ext];
      if (!imgSrc) {
        imgSrc = unknownIcon;
      }
    }

    return (
      <img src={imgSrc} alt='' width={iconSize} />
    )
  };

  goToPreviewFileHandle = (fileUuid, fileName) => {
    fsUtils.gotoFilePreview(fileUuid, fileName);
  };

  render() {
    const { fileName, fileUuid } = this.props;

    const icon = this.getFileIcon(fileName);

    return (
      <div className={styles.previewFile}>
        {icon}&nbsp;<span style={{ cursor: 'pointer' }} onClick={() => this.goToPreviewFileHandle(fileUuid, fileName)}>{fileName}</span>
      </div>
    );
  }

}

export default ExtensionIcon;
