import axios from 'axios';
import * as types from '../constants/cadreEngineersTypes';
import errorHandler from '../../services/errorHandler';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getCadreEngineersRequest = () => ({
  type: types.FETCH_CADRE_REQUEST
});

export const getCadreEngineersSuccess = engineers => ({
  type: types.FETCH_CADRE_SUCCESS,
  engineers
});

export const getCadreEngineersFailure = error => ({
  type: types.FETCH_CADRE_FAILURE,
  error
});

const getCadreEngineers = () => dispatch => {
  dispatch(getCadreEngineersRequest());
  const requestUrl = `${serverUrl}/api/v2/d1engineers`;
  return axios
    .get(requestUrl)
    .then(response => dispatch(getCadreEngineersSuccess(response.data)))
    .catch(error => dispatch(getCadreEngineersFailure(errorHandler(error))));
};

export default getCadreEngineers;
