import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import { ALL } from '../constants/fellowFilters';
import paginationExtract from '../../services/paginationExtract';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getFellows = ({
  perPage = 25,
  page = 1,
  filter = ALL,
  search,
  url,
  level = 'all',
  status = 'all',
  statusType = 'all'
} = {}) => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_REQUEST });
  let requestURL = url;
  if (!requestURL) {
    if (perPage === 'all') {
      requestURL = `${serverURL}/api/v1/fellows?perPage=all`;
    } else {
      requestURL = `${serverURL}/api/v1/fellows?perPage=${perPage}&page=${page}&filter=${filter}&level=${level}&status=${status}&statusType=${statusType}`;
      requestURL = search ? `${requestURL}&search=${search}` : requestURL;
    }
  }

  return axios.get(requestURL).then(
    response => {
      let { payload } = response.data;
      if (typeof response.data.payload === 'object') {
        payload = [];
        Object.keys(response.data.payload).map(key =>
          payload.push(response.data.payload[key])
        );
      }
      dispatch({
        type: types.LOAD_FELLOW_SUCCESS,
        fellows: payload,
        summary: response.data.summary,
        pagination: paginationExtract(response.data)
      });
    },
    error =>
      dispatch({
        type: types.LOAD_FELLOW_FAILURE,
        error: errorHandler(error)
      })
  );
};

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
