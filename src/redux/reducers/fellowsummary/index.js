import initialState from '../initialState';
import {
  FETCH_TTLLF_SUMMARY_REQUEST,
  FETCH_TTLLF_SUMMARY_ERROR,
  FETCH_TTLLF_SUMMARY_SUCCESS
} from '../../constants/fellowSummary';

export default (state = initialState.fellowsSummary, action) => {
  switch (action.type) {
    case FETCH_TTLLF_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_TTLLF_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_TTLLF_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        fellowsSummaryToday: action.fellowsSummaryToday,
        fellowsSummaryTrend: action.fellowsSummaryTrend
      };
    default:
      return state;
  }
};
