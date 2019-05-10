import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_MANAGERFELLOWS_REQUEST,
  LOAD_MANAGERFELLOWS_SUCCESS,
  LOAD_MANAGERFELLOWS_FAILURE
} from '../constants/managerFellowTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getManagerFellows = email => dispatch => {
  dispatch({ type: LOAD_MANAGERFELLOWS_REQUEST });
  const requestURL = `${serverURL}/api/v1/managers/fellows?email=${email}`;
  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: LOAD_MANAGERFELLOWS_SUCCESS,
        managerFellows: response.data
      }),
    error =>
      dispatch({
        type: LOAD_MANAGERFELLOWS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getManagerFellows;
