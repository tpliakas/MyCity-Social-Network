import axios from 'axios';
import { GET_TICKETS, GET_TICKET, TICKET_ERROR } from './types';

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
