import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status="404"
      l
      title={
        <h1 className="x-large text-primary">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
      }
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/" className="btn btn-primary my-1">
          Back Home
        </Link>
      }
    />
  );
};

export default NotFound;
