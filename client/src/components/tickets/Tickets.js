import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import Spinner from '../layout/Spinner';
import TicketItem from './TicketItem';
import { getTickets } from '../../actions/ticket';
import { useDebounce } from 'use-debounce';
import { AnimatePresence, motion } from 'framer-motion';

const { Search } = Input;

const Tickets = ({ getTickets, ticket: { tickets, loading } }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [value] = useDebounce(searchValue, 500);

  const onChange = (e) => setSearchValue(e.target.value);

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
      <div className="profiles-search">
        <Search
          placeholder="Filter Area. e.g. Marousi"
          onChange={onChange}
          enterButton
          loading={false}
        />
      </div>
      <div className="tickets">
        {tickets?.map((ticket) => {
          if (value) {
            if (ticket.area.toLowerCase().includes(value.toLowerCase())) {
              return (
                <motion.div
                  key={ticket._id}
                  initial={{ x: '-500px', opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.8 }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <TicketItem key={ticket._id} ticket={ticket} />
                </motion.div>
              );
            }
          } else {
            return (
              <AnimatePresence key={ticket._id}>
                <motion.div
                  initial={{ x: '-500px', opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.8 }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <TicketItem key={ticket._id} ticket={ticket} />
                </motion.div>
              </AnimatePresence>
            );
          }
        })}
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
