import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getManagerProfileData = () => dispatch => {
  dispatch({ type: types.MANAGER_PROFILE_DATA_REQUEST });
  const requestURL = `${serverURL}/api/v2/managers/profile`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.MANAGER_PROFILE_DATA_SUCCESS,
        data: response.data
      }),
    error =>
      dispatch({
        type: types.MANAGER_PROFILE_DATA_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getManagerProfileData;
