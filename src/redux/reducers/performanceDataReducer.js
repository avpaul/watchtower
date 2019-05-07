import initialState from './initialState';
import {
  FETCH_PERFORMANCE_DATA_REQUEST,
  FETCH_PERFORMANCE_DATA_FAILURE,
  FETCH_PERFORMANCE_DATA_SUCCESS
} from '../constants/performanceTypes';

export default (state = initialState.performanceData, action) => {
  switch (action.type) {
    case FETCH_PERFORMANCE_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_PERFORMANCE_DATA_FAILURE:
      return { ...state, error: action.error, loading: false };
    case FETCH_PERFORMANCE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data || initialState.performanceData.data
      };
    default:
      return state;
  }
};
