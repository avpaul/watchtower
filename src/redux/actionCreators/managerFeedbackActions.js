import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerFeedbackActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getManagerFeedback = () => dispatch => {
  dispatch({
    type: types.LOAD_FEEDBACK_REQUEST
  });
  const requestUrl = `${serverURL}/api/v2/managers/feedback`;

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
