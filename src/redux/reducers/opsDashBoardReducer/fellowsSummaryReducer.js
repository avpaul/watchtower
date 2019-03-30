import {
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../constants/fellowActionTypes';
import initialState from '../initialState';

export default (state = initialState.opsDashboard.fellowsSummary, action) => {
  switch (action.type) {
    case FETCH_FELLOWS_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_FELLOWS_SUMMARY_ERROR:
      return { ...state, error: action.error, loading: false };
    case FETCH_FELLOWS_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action
      };
    default:
      return state;
  }
};
