import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/ttlTypes';
import {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE
} from '../constants/locationsTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getTTLs = () => dispatch => {
  dispatch({ type: types.LOAD_TTLS_REQUEST });
  const requestURL = `${serverURL}/api/v1/ttls`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_TTLS_SUCCESS,
        ttls: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_TTLS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export const getLocations = () => dispatch => {
  dispatch({ type: LOAD_LOCATIONS_REQUEST });
  const requestURL = `${serverURL}/api/v1/locations`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: LOAD_LOCATIONS_SUCCESS,
        locations: response.data
      }),
    error =>
      dispatch({
        type: LOAD_LOCATIONS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getTTLs;
