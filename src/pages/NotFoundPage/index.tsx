import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): JSX.Element => (
  <Alert
    className={styles.alert}
    message={<h1 className={styles.message}>Content Unavailable</h1>}
    description={
      <p className={styles.description}>
        The page you are looking for is not available. Go to the
        <Link to="/">homepage</Link>.
      </p>
    }
    type="warning"
    showIcon
  />
);

export default NotFoundPage;
