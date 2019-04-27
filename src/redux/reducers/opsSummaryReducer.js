import initialState from './initialState';
import {
  LOAD_OPS_SUMMARY_REQUEST,
  LOAD_OPS_SUMMARY_SUCCESS,
  LOAD_OPS_SUMMARY_FAILURE
} from '../constants/managerActionTypes';

const opsSummaryReducer = (state = initialState.opsSummary, action) => {
  switch (action.type) {
    case LOAD_OPS_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_OPS_SUMMARY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case LOAD_OPS_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default opsSummaryReducer;
