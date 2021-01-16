import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Switch } from 'antd';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhlb3Jpb3MiLCJhIjoiY2trMGY0OHI3MGdzeTJ2cXMwZHVhdDJnMiJ9.F3BOTpZILjuG5nCjGIQB7A';

const TicketMap = ({ onMapChange, tickets }) => {
  console.log({ tickets });
  const [map, setMap] = useState(null);

  useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/theorios/ckk0f38ha17aw17nljhjd23n8',
        center: [23.727539, 37.98381],
        zoom: 11
      })
    );
  }, []);

  console.log(map);

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
