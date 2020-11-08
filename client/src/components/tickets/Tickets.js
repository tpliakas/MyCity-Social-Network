import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import TicketItem from './TicketItem';
import { getTickets } from '../../actions/ticket';

const Tickets = ({ getTickets, ticket: { tickets, loading } }) => {
  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return loading ? (
    <Spinner tip="Loading..." size="large" />
  ) : (
    <>
      <h1 className="large text-primary">Issue Tickets</h1>
      <p className="lead">
        <i className="fas fa-user" /> List of all open Issue Tickets
      </p>
      <div className="tickets">
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

Tickets.propTypes = {
  getTickets: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  ticket: state.ticket
});

export default connect(mapStateToProps, { getTickets })(Tickets);
