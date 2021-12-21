import React from 'react';

import './ErrorMsg.scss';

const ErrorMsg = (): JSX.Element => (
  <div className="error">
    <div className="error-box">
      <span className="error-message">
        Oops! NBA data is not avaliable, please try again later
      </span>
    </div>
  </div>
);

export default ErrorMsg;
