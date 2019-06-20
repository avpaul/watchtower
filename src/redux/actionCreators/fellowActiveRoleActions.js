import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
  FETCH_ROLE_ACTIVE_ENGINEER_REQUEST,
  FETCH_ROLE_ACTIVE_ENGINEER_FAILURE
} from '../constants/fellowActiveRolesTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getFellowRoleActiveRequest = () => ({
  type: FETCH_ROLE_ACTIVE_ENGINEER_REQUEST
});

export const getFellowRoleActiveSuccess = (data = []) => ({
  type: FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
  data
});

export const getFellowRoleActiveFailure = error => ({
  type: FETCH_ROLE_ACTIVE_ENGINEER_FAILURE,
  error: errorHandler(error)
});

export const getActiveRoleEngineer = roleId => dispatch => {
  dispatch(getFellowRoleActiveRequest());

  const requestUrl = `${serverURL}/api/v2/ops/roles/${roleId}`;

  return axios
    .get(requestUrl)
    .then(
      response => dispatch(getFellowRoleActiveSuccess(response.data[0])),
      error => dispatch(getFellowRoleActiveFailure(error))
    );
};
