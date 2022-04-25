import React from 'react';
import { Spin, Space } from 'antd';
import styles from './Spinner.module.scss';

const Spinner = (): JSX.Element => (
  <Space className={styles.spinner}>
    <Spin size="large" tip="Data is loading. Please wait..." />
  </Space>
);

export default Spinner;
