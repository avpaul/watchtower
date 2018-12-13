import initialState from './initialState';
import {
  LOAD_UNREAD_NOTIFICATION_REQUEST,
  LOAD_UNREAD_NOTIFICATION_SUCCESS,
  LOAD_UNREAD_NOTIFICATION_FAILURE
} from '../constants/fellowUnreadNotifications';

const fellowUnreadNotificationReducer = (
  state = initialState.unreadnotification,
  action
) => {
  switch (action.type) {
    case LOAD_UNREAD_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_UNREAD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        unreadnotification: action.unreadnotification
      };

    case LOAD_UNREAD_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default fellowUnreadNotificationReducer;
