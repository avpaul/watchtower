import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getManagers = () => dispatch => {
  dispatch({ type: types.LOAD_MANAGER_REQUEST });

  const requestURL = `${serverURL}/api/v1/managers`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_MANAGER_SUCCESS,
        managers: response.data.data
      }),
    error =>
      dispatch({
        type: types.LOAD_MANAGER_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getManagers;
