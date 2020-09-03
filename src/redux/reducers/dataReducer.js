import {
  SET_EVENTS,
  GONNA_EVENT,
  UNGONNA_EVENT,
  LOADING_DATA,
  DELETE_EVENT,
  POST_EVENT,
  SET_EVENT,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  events: [],
  event: {},
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };

    case GONNA_EVENT:
    case UNGONNA_EVENT:
      let index = state.events.findIndex(
        (event) => event.eventId === payload.eventId
      );
      state.events[index] = payload;
      return {
        ...state,
      };

    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case DELETE_EVENT:
      let deleteIndex = state.events.findIndex(
        (event) => event.eventId === payload
      );
      console.log(payload, deleteIndex);
      state.events.splice(deleteIndex, 1);
      return {
        ...state,
      };
    case POST_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
      };
    case SET_EVENT:
      return {
        ...state,
        event: payload,
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        event: {
          ...state.event,
          comments: [payload, ...state.event.comments],
        },
      };

    default:
      return state;
  }
};
