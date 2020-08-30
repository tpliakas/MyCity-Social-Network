import React from 'react';
import { Spin } from 'antd';

export default ({ size, tip }) => (
  <div className="spinner">
    <Spin tip={tip} size={size} />
  </div>
);
