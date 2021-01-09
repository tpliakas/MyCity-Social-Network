import {
  GET_TICKETS,
  GET_TICKET,
  ADD_TICKET,
  TICKET_ERROR,
  UPDATE_TICKET_LIKES
} from '../actions/types';

const initialState = {
  tickets: [],
  ticket: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false
      };
    case GET_TICKET:
      return {
        ...state,
        ticket: payload,
        loading: false
      };
    case ADD_TICKET:
      return {
        ...state,
        tickets: [payload, ...state.tickets],
        loading: false
      };
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_TICKET_LIKES:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket._id === payload.id
            ? {
                ...ticket,
                likes: payload.likes
              }
            : ticket
        ),
        loading: false
      };
    default:
      return state;
  }
}
