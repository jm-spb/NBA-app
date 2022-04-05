import React from 'react';
import { Spin, Space } from 'antd';

import styles from './Spinner.module.scss';

const Spinner = (): JSX.Element => (
  <Space className={styles.spinner}>
    <Spin size="large" />
  </Space>
);

export default Spinner;
