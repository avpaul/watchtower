import initialState from './initialState';
import {
  LOAD_FELLOW_LMS_SUMMARY_REQUEST,
  LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
  LOAD_FELLOW_LMS_SUMMARY_FAILURE
} from '../constants/fellowActionTypes';

const fellowLmsSummaryReducer = (
  state = initialState.fellowLmsSummary,
  action
) => {
  switch (action.type) {
    case LOAD_FELLOW_LMS_SUMMARY_REQUEST:
      return {
        ...state,
        lmsSummary: [],
        loading: true,
        error: null
      };

    case LOAD_FELLOW_LMS_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        lmsSummary: action.lmsSummary
      };

    case LOAD_FELLOW_LMS_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowLmsSummaryReducer;
