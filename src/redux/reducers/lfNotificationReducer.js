import initialState from './initialState';
import {
  LOAD_LF_NOTIFICATION_REQUEST,
  LOAD_LF_NOTIFICATION_SUCCESS,
  LOAD_LF_NOTIFICATION_FAILURE
} from '../constants/lfNotificationTypes';

const lfNotificationReducer = (state = initialState.lfNotification, action) => {
  switch (action.type) {
    case LOAD_LF_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_LF_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        lfNotification: action.lfNotification,
        error: null
      };
    case LOAD_LF_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default lfNotificationReducer;
