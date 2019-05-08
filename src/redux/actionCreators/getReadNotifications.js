import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE
} from '../constants/fellowNotificationTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getReadNotifications = () => dispatch => {
  dispatch({ type: LOAD_NOTIFICATION_REQUEST });
  const url = `${serverURL}/api/v2/notifications?filter=read`;
  return axios.get(url).then(
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

export default getReadNotifications;
