import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getFellowHistoryData = fellowId => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PULSE_REQUEST });
  let requestURL;
  if (!requestURL) {
    requestURL = `${serverURL}/api/v2/fellows/${fellowId}`;
  }
  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_PULSE_SUCCESS,
        ratings: response.data.ratings,
        lmsSubmissions: response.data.lms_submissions
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_PULSE_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowHistoryData;
