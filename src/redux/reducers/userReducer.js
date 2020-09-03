import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  GONNA_EVENT,
  UNGONNA_EVENT,
  MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  gonnas: [],
  notifications: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case GONNA_EVENT:
      return {
        ...state,
        gonnas: [
          ...(state.gonnas || []),
          {
            username: state.credentials.username,
            eventId: payload.eventId,
          },
        ],
      };

    case UNGONNA_EVENT:
      return {
        ...state,
        gonnas: state.gonnas.filter(
          (event) => event.eventId !== payload.eventId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
};
