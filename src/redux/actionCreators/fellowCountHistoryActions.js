import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowCountHistory';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export default () => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_COUNT_HISTORY_REQUEST });

  const requestURL = `${serverURL}/api/v1/fellow/summary`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_COUNT_HISTORY_SUCCESS,
        countSummary: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_COUNT_HISTORY_FAILURE,
        error: errorHandler(error)
      })
  );
};
