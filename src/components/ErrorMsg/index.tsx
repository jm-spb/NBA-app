import React from 'react';

import './ErrorMsg.scss';

interface IErrorMsgProps {
  notAvaliableService: string;
}

const ErrorMsg = ({ notAvaliableService }: IErrorMsgProps): JSX.Element => (
  <div className="error">
    <div className="error-box">
      <span className="error-message">
        {`${notAvaliableService} Service is not avaliable, please try again later`}
      </span>
    </div>
  </div>
);

export default ErrorMsg;
