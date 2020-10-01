import axios from 'axios';
import { GET_TICKETS, GET_TICKET, ADD_TICKET, TICKET_ERROR } from './types';
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

// Add ticket
export const addTicket = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/ticket', formData, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data
    });

    dispatch(setAlert('New Ticket Issue Created', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
