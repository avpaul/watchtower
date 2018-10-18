import initialState from './initialState';
import {
  LOAD_FELLOW_REQUEST,
  LOAD_FELLOW_SUCCESS,
  LOAD_FELLOW_FAILURE,
} from '../constants/fellowActionTypes';

const fellowReducer = (state = initialState.fellows, action) => {
  switch (action.type) {
    case LOAD_FELLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_FELLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        fellows: action.fellows,
        summary: action.summary,
        pagination: action.pagination,
      };

    case LOAD_FELLOW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default fellowReducer;
