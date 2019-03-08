import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import auth from '../../services/auth';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getFellowDevPulse = fellowEmail => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PULSE_REQUEST });
  let requestURL;
  let newEmail = fellowEmail;
  if (!fellowEmail) {
    const { email } = auth.loadUserFromToken();
    newEmail = email;
  }
  if (!requestURL) {
    requestURL = `${serverURL}/api/v1/fellows/pulse?user=${newEmail}`;
  }
  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_PULSE_SUCCESS,
        ratings: response.data.data.weeklyRatings,
        averageRatings: response.data.data.averageRatings
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_PULSE_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowDevPulse;
