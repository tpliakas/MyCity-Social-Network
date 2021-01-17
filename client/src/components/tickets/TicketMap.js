import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import mapboxgl from 'mapbox-gl';
import { motion } from 'framer-motion';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhlb3Jpb3MiLCJhIjoiY2trMGY0OHI3MGdzeTJ2cXMwZHVhdDJnMiJ9.F3BOTpZILjuG5nCjGIQB7A';

const TicketMap = ({ onMapChange, tickets }) => {
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

  const ticketsList = useMemo(() => {
    if (tickets) {
      const ticketsGeo = tickets.map((ticket, idx) => {
        const { address, addressNumber, area, city, location } = ticket;

        let coordinates;
        if (location) {
          let coords = location.split(',');
          coordinates = [parseFloat(coords[0]), parseFloat(coords[1])];
        }

        return {
          id: idx,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates || []
          },
          properties: {
            address: address,
            addressNumber: addressNumber,
            city: city,
            area: area
          }
        };
      });

      return {
        type: 'FeatureCollection',
        features: ticketsGeo
      };
    }
  }, [tickets]);

  useEffect(() => {
    if (map && ticketsList) {
      map.on('load', function (e) {
        map.addLayer({
          id: 'locations',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: ticketsList
          },
          layout: {
            'icon-image': 'ch-motorway-2',
            'icon-allow-overlap': true
          }
        });
      });
    }
  }, [map, ticketsList]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1 }
      }}
      exit={{ opacity: 0, scale: 0 }}
    >
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
    </motion.div>
  );
};

TicketMap.propTypes = {
  onMapChange: PropTypes.func.isRequired,
  tickets: PropTypes.array.isRequired
};

export default TicketMap;
