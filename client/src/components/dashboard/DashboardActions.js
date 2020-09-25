import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

const DashboardActions = ({ name }) => {
  return (
    <div className="dashboard-actions">
      <p className="lead">
        <i className="fas fa-user" /> Welcome {name || '!'}
      </p>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-primary">
          <i className="fas fa-user-circle text-white" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-primary">
          <i className="fab fa-black-tie text-white" /> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-primary">
          <i className="fas fa-graduation-cap text-white" /> Add Education
        </Link>
        <Tooltip title="Create new issue regarding a city">
          <Link to="/add-issue" className="btn btn-dark">
            <i className="fas fa-ticket-alt" /> Add New Ticket
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default DashboardActions;
