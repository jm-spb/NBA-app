import React from 'react';
import { Spin, Space } from 'antd';

const Spinner = (): JSX.Element => (
  <Space className="spinner">
    <Spin size="large" />
  </Space>
);

export default Spinner;
