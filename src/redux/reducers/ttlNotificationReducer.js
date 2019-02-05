import initialState from './initialState';
import {
  LOAD_TTL_NOTIFICATION_REQUEST,
  LOAD_TTL_NOTIFICATION_SUCCESS,
  LOAD_TTL_NOTIFICATION_FAILURE
} from '../constants/ttlNotificationTypes';

const ttlNotificationReducer = (
  state = initialState.ttlNotification,
  action
) => {
  switch (action.type) {
    case LOAD_TTL_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_TTL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ttlNotification: action.ttlNotification,
        error: null
      };
    case LOAD_TTL_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default ttlNotificationReducer;
