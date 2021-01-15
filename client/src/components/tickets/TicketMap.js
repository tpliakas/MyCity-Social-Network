import React from 'react';
// import PropTypes from 'prop-types';
import { Switch } from 'antd';

const TicketMap = ({ onMapChange }) => {
  return (
    <div className="map-wrapper">
      <div className="map-switch">
        <Switch
          onChange={onMapChange}
          checkedChildren="Map enabled"
          unCheckedChildren="Map disabled"
          defaultChecked
          autoFocus
        />
      </div>
      <div className="sidebar pad2">Tickets List</div>
      <div id="map" className="map pad2">
        Map
      </div>
    </div>
  );
};

// TicketMap.propTypes = {};

export default TicketMap;
