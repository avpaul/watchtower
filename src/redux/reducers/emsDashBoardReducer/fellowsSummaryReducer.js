import {
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_EM_SUMMARY_ERROR
} from '../../constants/fellowSummary';
import initialState from '../initialState';

export default (state = initialState.emsDashboard.fellowsSummary, action) => {
  switch (action.type) {
    case FETCH_EM_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_EM_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_EM_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.summary
      };
    default:
      return state;
  }
};
