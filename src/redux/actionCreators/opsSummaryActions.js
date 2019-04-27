import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getOpsSummary = () => dispatch => {
  dispatch({ type: types.LOAD_OPS_SUMMARY_REQUEST });

  const requestURL = `${serverURL}/api/v2/managers/ops`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_OPS_SUMMARY_SUCCESS,
        data: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_OPS_SUMMARY_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getOpsSummary;
