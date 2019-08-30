import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../constants/d1FellowProfileDataTypes';
import errorHandler from '../../services/errorHandler';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;

export const activateCadreEngineerAccountRequest = () => ({
  type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST
});

export const activateCadreEngineerAccountSuccess = fellow => ({
  type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS,
  fellow
});

export const activateCadreEngineerAccountFailure = error => ({
  type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE,
  error
});

export const activateCadreEngineerAccount = history => dispatch => {
  dispatch(activateCadreEngineerAccountRequest());
  const requestUrl = `${serverUrl}/api/v2/fellows/profile/cadre/activation`;
  return axios
    .put(requestUrl)
    .then(response => {
      dispatch(activateCadreEngineerAccountSuccess(response.data.fellow));
      history.push('/dashboard');
      toast.success('Account activation successful');
    })
    .catch(error => {
      dispatch(activateCadreEngineerAccountFailure(errorHandler(error)));
      toast.error('Account activation failed, please try again');
    });
};
