import React from 'react';
import { Alert, Button } from 'antd';
import classNames from 'classnames';
import styles from './ErrorMsg.module.scss';
import { ErrorMsgProps } from '../../types/props';

const ErrorMsg = ({
  error,
  failedData,
  notAvaliableService,
  dataIsEmpty,
}: ErrorMsgProps): JSX.Element => {
  const [isHidden, setIsHidden] = React.useState(true);
  const handleOnClick = () => {
    setIsHidden((state) => !state);
  };

  const errorData = React.useMemo(() => {
    if (dataIsEmpty)
      return 'Game you are looking for is not exist. Please provide a valid game id';
    if (error && 'error' in error) return error.error;
    if (error && 'data' in error) {
      const { message } = error.data as { message: string };
      return message;
    }
    if (error && 'message' in error) return error.message as string;
    return '';
  }, [error, dataIsEmpty]);

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
          {errorData}
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
