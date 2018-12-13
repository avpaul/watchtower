import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_UNREAD_NOTIFICATION_REQUEST,
  LOAD_UNREAD_NOTIFICATION_SUCCESS,
  LOAD_UNREAD_NOTIFICATION_FAILURE
} from '../constants/fellowUnreadNotifications';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getFellowUnreadNotification = email => dispatch => {
  dispatch({ type: LOAD_UNREAD_NOTIFICATION_REQUEST });
  const emailAdd =
    email === 'wt-test-fellow@andela.com'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_FELLOW_EMAIL
      : email;
  const url = `${serverURL}/api/v1/notifications?filter=unread`;

  return axios.get(url, { headers: { email: emailAdd } }).then(
    response =>
      dispatch({
        type: LOAD_UNREAD_NOTIFICATION_SUCCESS,
        unreadnotification: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_UNREAD_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowUnreadNotification;
