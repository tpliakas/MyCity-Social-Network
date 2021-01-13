import React from 'react';
// import PropTypes from 'prop-types';
import { Switch } from 'antd';

const TicketMap = ({ onMapChange }) => {
  return (
    <>
      <p>Map</p>
      <div className="map-switch">
        <Switch
          onChange={onMapChange}
          checkedChildren="Map enabled"
          unCheckedChildren="Map disabled"
          defaultChecked
          autoFocus
        />
      </div>
    </>
  );
};

// TicketMap.propTypes = {};

export default TicketMap;
