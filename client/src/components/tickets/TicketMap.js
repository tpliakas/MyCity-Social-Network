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
        const { address, addressNumber, area, city, location, title } = ticket;

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
            area: area,
            title: title
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

  useEffect(() => {
    if (!ticketsList) return;
    ticketsList.features.forEach(function (ticket, i) {
      const prop = ticket.properties;
      const { id } = ticket;

      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));

      listing.id = 'listing-' + id;
      listing.className = 'item';

      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = 'link-' + id;
      link.innerHTML = `${prop.address} ${prop.addressNumber}`;

      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = `${prop.area}, ${prop.city}`;
    });
  }, [ticketsList]);

  const flyToTicket = (currentFeature) =>
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });

  const createPopUp = (currentFeature) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.title}</h3>` +
          '<h4>' +
          currentFeature.properties.address +
          '</h4>'
      )
      .addTo(map);
  };

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
        <div className="sidebar pad2">
          <div className="heading">
            <h1>Tickets List</h1>
          </div>
          <div id="listings" className="listings" />
        </div>
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
