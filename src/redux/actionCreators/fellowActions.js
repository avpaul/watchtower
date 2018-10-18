import axios from 'axios';

import * as types from '../constants/fellowActionTypes';
import paginationExtract from '../../services/paginationExtract';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getFellows = ({ perPage = 10, page = 1, filter = 'onTrack' } = {}) => (dispatch) => {
  dispatch({ type: types.LOAD_FELLOW_REQUEST });

  return axios.get(`${serverURL}?perPage=${perPage}&page=${page}&filter=${filter}`).then(
    response => dispatch({
      type: types.LOAD_FELLOW_SUCCESS,
      fellows: response.data.payload,
      summary: response.data.summary,
      pagination: paginationExtract(response.data),
    }),
    error => dispatch({
      type: types.LOAD_FELLOW_FAILURE,
      error: error.response.data,
    }),
  );
};

export const setVisibilityFilter = filter => (
  { type: types.SET_VISIBILITY_FILTER, filter });
