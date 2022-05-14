import React from 'react';
import { Spin, Space } from 'antd';
import styles from './Spinner.module.scss';

interface ISpinnerProps {
  loadingData: string;
}

const Spinner = ({ loadingData }: ISpinnerProps): JSX.Element => (
  <Space className={styles.box}>
    <Spin
      className={styles.spinner}
      size="large"
      tip={`${loadingData} is loading. Please wait...`}
    />
  </Space>
);

export default Spinner;
