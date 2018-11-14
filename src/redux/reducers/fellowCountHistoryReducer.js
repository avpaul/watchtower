import initialState from './initialState';
import {
  LOAD_FELLOW_COUNT_HISTORY_REQUEST,
  LOAD_FELLOW_COUNT_HISTORY_SUCCESS,
  LOAD_FELLOW_COUNT_HISTORY_FAILURE
} from '../constants/fellowCountHistory';

const fellowCountHistoryReducer = (
  state = initialState.fellowCountHistory,
  action
) => {
  switch (action.type) {
    case LOAD_FELLOW_COUNT_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_FELLOW_COUNT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        countSummary: action.countSummary
      };

    case LOAD_FELLOW_COUNT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowCountHistoryReducer;
