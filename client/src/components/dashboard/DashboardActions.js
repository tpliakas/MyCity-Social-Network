import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" /> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" /> Add Education
      </Link>
      <br />
      <br />
      <Tooltip title="Create new issue regarding a city">
        <Link to="/add-issue" className="btn btn-primary">
          <i className="fas fa-ticket-alt" /> Add New Ticket
        </Link>
      </Tooltip>
    </div>
  );
};

export default DashboardActions;
