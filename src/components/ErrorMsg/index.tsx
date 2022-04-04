import React from 'react';
import { Alert } from 'antd';
import styles from './ErrorMsg.module.scss';
import { IErrorMsgProps } from '../../types/errorMsg';

const ErrorMsg = ({ failedData, notAvaliableService }: IErrorMsgProps): JSX.Element => (
  <Alert
    className={styles.error}
    type="error"
    message={`Unable to display ${failedData}, ${notAvaliableService} Service is not avaliable. Please try again later`}
    banner
  />
);

export default ErrorMsg;
