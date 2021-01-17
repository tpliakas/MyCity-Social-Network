import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Image, Tag, Modal } from 'antd';
import ReactPlayer from 'react-player';
import {
  addTicketLike,
  removeTicketLike,
  deleteTicket
} from '../../actions/ticket';

const fallbackImage =
  'data:image/png;base64,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';

const TicketItem = ({
  addTicketLike,
  removeTicketLike,
  deleteTicket,
  auth,
  ticket: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    date,
    importance,
    address,
    addressNumber,
    area,
    city,
    currentStatus,
    images,
    video,
    location,
    title
  },
  showActions
}) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const showModal = () => {
    setIsVideoVisible(true);
  };

  const handleOk = () => {
    setIsVideoVisible(false);
  };

  const borderColor = useMemo(
    () =>
      importance === 'low'
        ? '#91d5ff'
        : importance === 'high'
        ? '#ffa39e'
        : '#ffd591',
    [importance]
  );

  return (
    <div
      className="post ticket bg-white p-1 my-1"
      style={{ border: 0, borderTop: `3px solid ${borderColor}` }}
    >
      <div className="ticket-side">
        <div className="top">
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
          <p>
            {currentStatus === 'Pending' ? (
              <Tag color="#2db7f5">{currentStatus}</Tag>
            ) : currentStatus === 'In Progress' ? (
              <Tag color="#87d068">{currentStatus}</Tag>
            ) : (
              <Tag color="#f50">{currentStatus}</Tag>
            )}
          </p>
        </div>
        <div className="bottom">
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
      <div>
        <p className="my-1 ticket-title">
          {title}{' '}
          <span>
            {importance === 'low' ? (
              <Tag color="blue">Low importance</Tag>
            ) : importance === 'high' ? (
              <Tag color="red">High importance</Tag>
            ) : (
              <Tag color="orange">Medium importance</Tag>
            )}
          </span>
        </p>
        <p className="ticket-address">
          <b>Address:</b> {`${address} ${addressNumber}, ${area}, ${city}`}
        </p>
        <p className="ticket-description">{text}</p>
        <div className="ticket-media">
          {images.length > 0 &&
            images.map(
              (image, idx) =>
                idx < 2 && (
                  <Image
                    key={idx}
                    width={200}
                    src={image}
                    fallback={fallbackImage}
                  />
                )
            )}
          {video && (
            <div
              className="ticket-video"
              onClick={showModal}
              style={{ width: images.length > 0 ? 200 : 'auto' }}
            >
              <i className="fab fa-youtube fa-5x" />
            </div>
          )}
        </div>
      </div>
      {isVideoVisible && (
        <Modal
          maskClosable
          title="Video"
          visible={isVideoVisible}
          onOk={handleOk}
          onCancel={handleOk}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={900}
        >
          <ReactPlayer
            url={video}
            playing={isVideoVisible}
            width="100%"
            height={500}
            // controls={true}
          />
        </Modal>
      )}
    </div>
  );
};
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
