import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerFeedbackActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const ttlEmail = process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_EMAIL;
const lfEmail = process.env.REACT_APP_DEFAULT_WATCHTOWER_LF_EMAIL;

const getManagerFeedback = (role, email) => dispatch => {
  dispatch({
    type: types.LOAD_FEEDBACK_REQUEST
  });
  let requestUrl = `${serverURL}/api/v1/managers/feedback`;

  if (role.WATCH_TOWER_TTL)
    requestUrl = `${serverURL}/api/v1/managers/feedback?email=${ttlEmail ||
      email}`;
  if (role.WATCH_TOWER_LF)
    requestUrl = `${serverURL}/api/v1/managers/feedback?email=${lfEmail ||
      email}`;

  return axios
    .get(requestUrl)
    .then(response =>
      dispatch({
        type: types.FEEDBACK_REQUEST_SUCCESS,
        managersFeedback: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: types.FEEDBACK_REQUEST_FAILURE,
        error: errorHandler(error)
      })
    );
};

export default getManagerFeedback;
