import axios from 'axios';
import {
  GET_TICKETS,
  GET_TICKET,
  TICKET_ERROR,
  UPDATE_TICKET_LIKES,
  DELETE_TICKET
} from './types';
import { setAlert } from './alert';

// Get tickets
export const getTickets = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tickets');

    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get ticket
export const getTicket = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add ticket like
export const addTicketLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/tickets/like/${id}`);

    dispatch({
      type: UPDATE_TICKET_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove ticket like
export const removeTicketLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/tickets/unlike/${id}`);

    dispatch({
      type: UPDATE_TICKET_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete ticket
export const deleteTicket = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tickets/${id}`);

    dispatch({
      type: DELETE_TICKET,
      payload: id
    });

    dispatch(setAlert('Ticket Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
