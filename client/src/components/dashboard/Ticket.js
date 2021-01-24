import React, { useEffect, useMemo } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { dateFormat } from '../../utils/other';
import { getTickets } from '../../actions/ticket';

const Ticket = ({ getTickets, ticket: { tickets, loading }, user }) => {
  useEffect(() => {
    getTickets();
  }, [getTickets]);

  const currentUserTickets = useMemo(() => {
    if (!tickets || !user) return [];
    return tickets.filter((ticket) => ticket.user === user._id);
  }, [tickets, user]);

  const ticketsList = currentUserTickets.map((ticket) => (
    <tr key={ticket._id}>
      <td>{ticket.title}</td>
      <td className="hide-sm">{`${ticket.address} ${ticket.addressNumber}`}</td>
      <td className="hide-sm">{`${ticket.area}, ${ticket.city}`}</td>
      <td>
        <Moment format={dateFormat}>{moment(ticket.date)}</Moment>
      </td>
      <td className="hide-sm">
        {ticket.currentStatus === 'Pending' ? (
          <Tag color="#2db7f5">{ticket.currentStatus}</Tag>
        ) : ticket.currentStatus === 'In Progress' ? (
          <Tag color="#87d068">{ticket.currentStatus}</Tag>
        ) : (
          <Tag color="#f50">{ticket.currentStatus}</Tag>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="dashboard-education">
      <h2 className="my-2">My Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="hide-sm">Address</th>
            <th className="hide-sm">Area/City</th>
            <th className="hide-sm">Date</th>
            <th className="hide-sm">Status</th>
          </tr>
        </thead>
        <tbody>{ticketsList}</tbody>
      </table>
    </div>
  );
};

Ticket.propTypes = {
  getTickets: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ticket: state.ticket
});

export default connect(mapStateToProps, { getTickets })(Ticket);
