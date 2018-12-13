import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_READ_NOTIFICATION_REQUEST,
  LOAD_READ_NOTIFICATION_SUCCESS,
  LOAD_READ_NOTIFICATION_FAILURE
} from '../constants/fellowReadNotifications';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getFellowReadNotification = email => dispatch => {
  dispatch({ type: LOAD_READ_NOTIFICATION_REQUEST });
  const emailAdd =
    email === 'wt-test-fellow@andela.com'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_FELLOW_EMAIL
      : email;
  const url = `${serverURL}/api/v1/notifications/0`;
  return axios.put(url, {}, { headers: { email: emailAdd } }).then(
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

export default getFellowReadNotification;
