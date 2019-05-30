import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../constants/pipDeactivationTypes';
import errorHandler from '../../services/errorHandler';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;

export const deactivatePipSuccess = () => ({
  type: types.DEACTIVATION_SUCCESS
});

export const deactivatePipFailure = error => ({
  type: types.DEACTIVATION_FAILURE,
  error
});

export const deactivatePip = () => ({
  type: types.DEACTIVATION_REQUEST
});

const deactivatePIPAction = (fellowId, history) => dispatch => {
  dispatch({ type: types.DEACTIVATION_REQUEST });
  return axios
    .put(`${serverUrl}/api/v2/fellows/${fellowId}/ratings-pip/-`)
    .then(() => {
      dispatch(deactivatePipSuccess());
      toast.success('PIP was deactivated successfully');
      history.push('/developers');
    })
    .catch(error => {
      dispatch(deactivatePipFailure(errorHandler(error)));
      toast.error('Operation was not successful');
      history.push('/developers');
    });
};

export default deactivatePIPAction;
