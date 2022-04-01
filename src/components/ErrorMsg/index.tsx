import React from 'react';

import styles from './ErrorMsg.module.scss';

interface IErrorMsgProps {
  notAvaliableService: string;
}

const ErrorMsg = ({ notAvaliableService }: IErrorMsgProps): JSX.Element => (
  <div className={styles.error}>
    <div className={styles.box}>
      <span className={styles.message}>
        {`${notAvaliableService} Service is not avaliable, please try again later`}
      </span>
    </div>
  </div>
);

export default ErrorMsg;
