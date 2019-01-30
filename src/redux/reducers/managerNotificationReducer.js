import initialState from './initialState';
import {
  LOAD_MANAGER_READ_NOTIFICATION_REQUEST,
  LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
  LOAD_MANAGER_READ_NOTIFICATION_FAILURE
} from '../constants/managerNotificationTypes';

const updateManagerNotification = (
  state = initialState.updateManagerNotification,
  action
) => {
  switch (action.type) {
    case LOAD_MANAGER_READ_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_MANAGER_READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        managerNotification: action.updateManagerNotification
      };

    case LOAD_MANAGER_READ_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        managerNotification: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default updateManagerNotification;
