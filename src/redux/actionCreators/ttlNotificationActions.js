import axios from 'axios';
import {
  LOAD_TTL_NOTIFICATION_REQUEST,
  LOAD_TTL_NOTIFICATION_SUCCESS,
  LOAD_TTL_NOTIFICATION_FAILURE
} from '../constants/ttlNotificationTypes';
import errorHandler from '../../services/errorHandler';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getTtlNotification = email => dispatch => {
  dispatch({ type: LOAD_TTL_NOTIFICATION_REQUEST });
  const emailAdd =
    email === 'wt-test-ttl@andela.com'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_EMAIL
      : email;

  const url = `${serverURL}/api/v1/managers/notification?email=${emailAdd}`;
  return axios.get(url).then(
    response =>
      dispatch({
        type: LOAD_TTL_NOTIFICATION_SUCCESS,
        ttlNotification: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_TTL_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getTtlNotification;
