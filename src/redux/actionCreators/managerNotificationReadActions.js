import axios from 'axios';
import {
  LOAD_MANAGER_READ_NOTIFICATION_REQUEST,
  LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
  LOAD_MANAGER_READ_NOTIFICATION_FAILURE
} from '../constants/managerNotificationTypes';
import errorHandler from '../../services/errorHandler';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const updateManagerNotificationAsRead = id => dispatch => {
  dispatch({ type: LOAD_MANAGER_READ_NOTIFICATION_REQUEST });

  const url = `${serverURL}/api/v1/managers/notification/${id}/read`;
  return axios.put(url).then(
    response =>
      dispatch({
        type: LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
        updateManagerNotification: response.data
      }),
    error =>
      dispatch({
        type: LOAD_MANAGER_READ_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default updateManagerNotificationAsRead;
