import React from 'react';
import { Alert } from 'antd';

const WarningMsg = ({ message }: { message: string }): JSX.Element => (
  <Alert message={message} type="warning" showIcon closable />
);

export default WarningMsg;
