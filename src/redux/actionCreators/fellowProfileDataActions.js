import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_FELLOW_PROFILE_DATA_FAILURE
} from '../constants/fellowProfileDataTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export default fellowId => dispatch => {
  dispatch({ type: LOAD_FELLOW_PROFILE_DATA_REQUEST });

  return axios.get(`${serverURL}/api/v2/fellows/${fellowId || 'profile'}`).then(
    response =>
      dispatch({
        type: LOAD_FELLOW_PROFILE_DATA_SUCCESS,
        fellow: response.data
      }),
    error =>
      dispatch({
        type: LOAD_FELLOW_PROFILE_DATA_FAILURE,
        error: errorHandler(error)
      })
  );
};
