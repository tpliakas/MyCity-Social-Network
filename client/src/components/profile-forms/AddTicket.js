import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTicket } from '../../actions/profile';

const initialState = {
  title: '', //r
  city: '', //r
  area: '', //r
  location: null,
  address: '', //r
  addressNumber: '', //r
  ticketType: '', //r
  importance: '',
  images: [],
  video: '',
  status: '',
  text: '', //r
  name: ''
};

const AddTicket = ({ addTicket, history }) => {
  return (
    <>
      <h1 className="large text-primary">Add An Issue Ticket</h1>
      <p className="lead">Add your new issue ticket that you want to report.</p>
      <small>
        <span className="red">*</span> = required field
      </small>
    </>
  );
};

AddTicket.propTypes = {
  addTicket: PropTypes.func.isRequired
};

export default connect(null, { addTicket })(withRouter(AddTicket));
