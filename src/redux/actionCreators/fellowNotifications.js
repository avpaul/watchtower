import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE
} from '../constants/fellowNotificationTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getFellowNotification = email => dispatch => {
  dispatch({ type: LOAD_NOTIFICATION_REQUEST });
  const emailAdd =
    email === 'wt-test-fellow@andela.com'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_FELLOW_EMAIL
      : email;
  const url = `${serverURL}/api/v1/notifications`;
  return axios.get(url, { headers: { email: emailAdd } }).then(
    response =>
      dispatch({
        type: LOAD_NOTIFICATION_SUCCESS,
        notification: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowNotification;
