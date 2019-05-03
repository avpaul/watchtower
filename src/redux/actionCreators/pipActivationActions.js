import axios from 'axios';
import * as types from '../constants/pipActivationTypes';
import errorHandler from '../../services/errorHandler';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;

export const activatePipSuccess = data => ({
  type: types.ACTIVATION_SUCCESS,
  data
});

export const activatePipFailure = error => ({
  type: types.ACTIVATION_FAILURE,
  error
});

export const activatePipRequest = () => ({
  type: types.ACTIVATION_REQUEST
});

const activatePipAction = (fellowId, data) => dispatch => {
  dispatch({ type: types.ACTIVATION_REQUEST });
  return axios
    .post(`${serverUrl}/api/v2/fellows/${fellowId}/ratings-pip`, data)
    .then(response => dispatch(activatePipSuccess(response.data)))
    .catch(error => dispatch(activatePipFailure(errorHandler(error))));
};

export default activatePipAction;
