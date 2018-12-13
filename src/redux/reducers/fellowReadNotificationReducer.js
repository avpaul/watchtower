import initialState from './initialState';
import {
  LOAD_READ_NOTIFICATION_REQUEST,
  LOAD_READ_NOTIFICATION_SUCCESS,
  LOAD_READ_NOTIFICATION_FAILURE
} from '../constants/fellowReadNotifications';

const fellowReadNotificationReducer = (
  state = initialState.readnotification,
  action
) => {
  switch (action.type) {
    case LOAD_READ_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        readnotification: action.readnotification
      };

    case LOAD_READ_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default fellowReadNotificationReducer;
