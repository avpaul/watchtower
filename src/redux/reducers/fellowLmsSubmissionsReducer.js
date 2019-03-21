import initialState from './initialState';
import {
  LOAD_FELLOW_LMS_SUBMISSIONS_REQUEST,
  LOAD_FELLOW_LMS_SUBMISSIONS_SUCCESS,
  LOAD_FELLOW_LMS_SUBMISSIONS_FAILURE
} from '../constants/fellowActionTypes';

const fellowLmsSubmissionsReducer = (
  state = initialState.fellowLmsSubmissions,
  action
) => {
  switch (action.type) {
    case LOAD_FELLOW_LMS_SUBMISSIONS_REQUEST:
      return {
        ...state,
        lmsSubmissions: {},
        loading: true,
        error: null
      };

    case LOAD_FELLOW_LMS_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        lmsSubmissions: action.lmsSubmissions
      };

    case LOAD_FELLOW_LMS_SUBMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowLmsSubmissionsReducer;
