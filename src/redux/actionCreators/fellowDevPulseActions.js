import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import auth from '../../services/auth';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getFellowDevPulse = () => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PULSE_REQUEST });
  let requestURL;
  const { email } = auth.loadUserFromToken();
  if (!requestURL) {
    requestURL = `${serverURL}/api/v1/fellow/pulse?user=${email}`;
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
