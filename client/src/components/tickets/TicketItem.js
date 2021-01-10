import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addTicketLike,
  removeTicketLike,
  deleteTicket
} from '../../actions/ticket';

const TicketItem = ({
  addTicketLike,
  removeTicketLike,
  deleteTicket,
  auth,
  ticket: { _id, text, name, avatar, user, likes, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>

      {showActions && (
        <>
          <button
            onClick={() => addTicketLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes?.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeTicketLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteTicket(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

TicketItem.defaultProps = {
  showActions: true
};

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addTicketLike: PropTypes.func.isRequired,
  removeTicketLike: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addTicketLike,
  removeTicketLike,
  deleteTicket
})(TicketItem);
