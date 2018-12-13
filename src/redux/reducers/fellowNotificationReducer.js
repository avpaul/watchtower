import initialState from './initialState';
import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE
} from '../constants/fellowNotificationTypes';

const fellowNotificationReducer = (
  state = initialState.notification,
  action
) => {
  switch (action.type) {
    case LOAD_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: action.notification
      };

    case LOAD_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default fellowNotificationReducer;
