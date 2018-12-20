import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import auth from '../../services/auth';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getLmsSummary = () => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_LMS_SUMMARY_REQUEST });
  let requestURL;
  const { email } = auth.loadUserFromToken();
  if (!requestURL) {
    requestURL = `${serverURL}/api/v1/fellows/lms?email=${email}`;
  }
  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
        lmsSummary: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_SUMMARY_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getLmsSummary;
