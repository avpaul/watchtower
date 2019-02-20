import {
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_EM_SUMMARY_ERROR,
  FETCH_SL_SUMMARY_REQUEST,
  FETCH_SL_SUMMARY_SUCCESS,
  FETCH_SL_SUMMARY_ERROR,
  FETCH_LF_SUMMARY_REQUEST,
  FETCH_LF_SUMMARY_SUCCESS,
  FETCH_LF_SUMMARY_ERROR,
  FETCH_TTL_SUMMARY_REQUEST,
  FETCH_TTL_SUMMARY_SUCCESS,
  FETCH_TTL_SUMMARY_ERROR
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
    case FETCH_SL_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_SL_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_SL_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.summary
      };
    case FETCH_LF_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_LF_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_LF_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.summary
      };
    case FETCH_TTL_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_TTL_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_TTL_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.summary
      };
    default:
      return state;
  }
};
