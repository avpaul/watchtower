import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_READ_NOTIFICATION_REQUEST,
  LOAD_READ_NOTIFICATION_SUCCESS,
  LOAD_READ_NOTIFICATION_FAILURE
} from '../constants/fellowReadNotifications';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const markNotificationsAsRead = notificationId => dispatch => {
  dispatch({ type: LOAD_READ_NOTIFICATION_REQUEST });
  const url = `${serverURL}/api/v2/notifications/read/${notificationId}`;
  return axios.put(url, {}).then(
    response =>
      dispatch({
        type: LOAD_READ_NOTIFICATION_SUCCESS,
        readnotification: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_READ_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default markNotificationsAsRead;
