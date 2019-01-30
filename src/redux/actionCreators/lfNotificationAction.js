import axios from 'axios';
import {
  LOAD_LF_NOTIFICATION_REQUEST,
  LOAD_LF_NOTIFICATION_SUCCESS,
  LOAD_LF_NOTIFICATION_FAILURE
} from '../constants/lfNotificationTypes';
import errorHandler from '../../services/errorHandler';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getLfNotification = email => dispatch => {
  dispatch({ type: LOAD_LF_NOTIFICATION_REQUEST });
  const emailAdd =
    email === 'wt-test-lf@andela.com'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_LF_EMAIL
      : email;

  const url = `${serverURL}/api/v1/managers/notification?email=${emailAdd}`;
  return axios.get(url).then(
    response =>
      dispatch({
        type: LOAD_LF_NOTIFICATION_SUCCESS,
        lfNotification: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_LF_NOTIFICATION_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getLfNotification;
