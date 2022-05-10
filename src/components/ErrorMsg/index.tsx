import React from 'react';
import { Alert, Button } from 'antd';
import classNames from 'classnames';
import styles from './ErrorMsg.module.scss';
import { IErrorMsgProps } from '../../types/errorMsg';

const ErrorMsg = ({
  failedData,
  notAvaliableService,
  details,
}: IErrorMsgProps): JSX.Element => {
  const [isHidden, setIsHidden] = React.useState(true);
  const handleOnClick = () => {
    setIsHidden((state) => !state);
  };

  return (
    <Alert
      className={styles.error}
      type="error"
      message={
        <strong
          className={styles.message}
        >{`Unable to display ${failedData}. Please try again later, or contact the developer for further assistance`}</strong>
      }
      description={
        <div className={classNames({ [styles.isHidden]: isHidden })}>
          <strong>Service: </strong> {notAvaliableService} <strong>Message: </strong>
          {details}
        </div>
      }
      showIcon
      action={
        <Button className={styles.details} size="small" danger onClick={handleOnClick}>
          Details
        </Button>
      }
    />
  );
};

export default React.memo(ErrorMsg);
