import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_UNREAD_NOTIFICATION_REQUEST,
  LOAD_UNREAD_NOTIFICATION_SUCCESS,
  LOAD_UNREAD_NOTIFICATION_FAILURE
} from '../constants/fellowUnreadNotifications';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getFellowUnreadNotification = () => dispatch => {
  dispatch({ type: LOAD_UNREAD_NOTIFICATION_REQUEST });
  const url = `${serverURL}/api/v2/notifications?filter=unread`;

  return axios.get(url).then(
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
