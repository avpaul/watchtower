import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/ttlTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getTtlProjectsData = name => dispatch => {
  dispatch({ type: types.TTL_PROJECTS_REQUEST });
  const requestURL = `${serverURL}/api/v1/ttls/projects?name=${name}`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.TTL_PROJECTS_SUCCESS,
        projects: response.data
      }),
    error =>
      dispatch({
        type: types.TTL_PROJECTS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getTtlProjectsData;
