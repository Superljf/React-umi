import React, { Component } from 'react';
import styles from './index.less';
import ProjectionIcon from '../ProjectionIcon/index';

export default class EmptyView extends Component {
  render() {
    const {
      title,
      tip,
    } = this.props;
    return (
      <div className={styles.emptyView}>
        <div className={styles.emptyViewIcon}>
          <ProjectionIcon type="iconimg_empty_withbg-copy" />
        </div>

        <div className={styles.emptyViewText}>
          {title}
        </div>

        {
          Boolean(tip) && (
            <div className={styles.emptyViewTip}>
              {tip}
            </div>
          )
        }

      </div>
    );
  }
}
