import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { company, title, location, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">
      <strong>{company}</strong>
    </h3>
    <p>
      <Moment format="DD/MM/YYYY">{moment(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="DD/MM/YYYY">{moment(to)}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
