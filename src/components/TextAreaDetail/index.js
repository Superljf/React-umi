import React from 'react';
import { Input, Spin } from 'antd';
import style from './style.less';

class TextAreaDetail extends React.PureComponent{
  render() {
    const { defaultValue } = this.props;
    return (
      <div className={style.textAreaDetail} style={{position: 'relative'}}>
        {defaultValue ? (
          <Input.TextArea
            className={style.content}
            {...this.props}
          />
        ) : <Spin />}
        <div className={style.mask} />
      </div>
    );
  }
}

export default TextAreaDetail;
