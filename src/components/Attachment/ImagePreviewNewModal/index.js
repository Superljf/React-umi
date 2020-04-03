import React, { Component } from 'react';
import { Button, Modal, Icon, Col, Row } from 'antd';
import fsUtils from '../../../utils/fsUtils';
import styles from './index.less';

export default class ImagePreviewNewModal extends Component {

  constructor(props) {
    super(props);

    const { selectImageIndex, imageArray } = props;

    this.state = {
      selectImageIndex,
      imageArray,
    };
  }

  componentDidMount() {
  }

  handleButton = (type) => {

    const {
      selectImageIndex,
    } = this.state;

    switch (type) {
      case "left": {
        this.setState({
          selectImageIndex: selectImageIndex - 1,
        });
        break;
      }
      case "right": {
        this.setState({
          selectImageIndex: selectImageIndex + 1,
        });
        break;
      }
      default:{
        this.setState({
          selectImageIndex: selectImageIndex - 1,
        });
        break;
      }
    }
  };

  render() {
    const { visible, onOk, onCancel } = this.props;

    const {
      selectImageIndex,
      imageArray,
    } = this.state;

    return (
      <Modal
        title="图片预览"
        width='650px'
        visible={visible}
        onCancel={onOk}
        footer={[
          <span className={styles.countText} style={{color: "#1891FF"}}>{`${selectImageIndex + 1}`}</span>,
          <span className={styles.countText}>{`/${imageArray.length}`}</span>,
          <Button key="submit" type="primary" onClick={onCancel}>
            关闭
          </Button>,
        ]}
      >
        <div className={styles.imagePreview}>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={1}>
              <Button
                icon="left"
                className={styles.button}
                disabled={selectImageIndex === 0}
                onClick={this.handleButton.bind(this, "left")}
              />
            </Col>
            <Col span={22} style={{height:'450px',lineHeight:'450px'}}>
              <img
                className={styles.imagePreviewIcon}
                src={`${fsUtils.getViewFileAddress(imageArray[selectImageIndex].fileUuid)}`}
                alt="图片"
              />
            </Col>
            <Col span={1}>
              <Button
                icon="right"
                className={styles.button}
                disabled={selectImageIndex === imageArray.length - 1}
                onClick={this.handleButton.bind(this, "right")}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}
