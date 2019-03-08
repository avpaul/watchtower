import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import auth from '../../services/auth';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getLmsSubmissions = fellowEmail => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_LMS_SUBMISSIONS_REQUEST });
  let requestURL;
  let newEmail = fellowEmail;

  if (!fellowEmail) {
    const { email } = auth.loadUserFromToken();
    newEmail = email;
  }

  if (!requestURL) {
    requestURL = `${serverURL}/api/v1/fellows/lms/submissions?email=${newEmail}`;
  }
  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_SUBMISSIONS_SUCCESS,
        lmsSubmissions: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_SUBMISSIONS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getLmsSubmissions;
