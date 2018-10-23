import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowActionTypes';
import paginationExtract from '../../services/paginationExtract';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getFellows = ({
  url, perPage = 10, page = 1, filter = 'onTrack',
} = {}) => (dispatch) => {
  dispatch({ type: types.LOAD_FELLOW_REQUEST });

  const getUrl = url || `${serverURL}?perPage=${perPage}&page=${page}&filter=${filter}`;
  return axios.get(getUrl).then(
    response => dispatch({
      type: types.LOAD_FELLOW_SUCCESS,
      fellows: response.data.payload,
      summary: response.data.summary,
      pagination: paginationExtract(response.data),
    }),
    error => dispatch({
      type: types.LOAD_FELLOW_FAILURE,
      error: errorHandler(error.response.data),
    }),
  );
};

export const setVisibilityFilter = filter => (
  { type: types.SET_VISIBILITY_FILTER, filter });
