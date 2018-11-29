import initialState from './initialState';
import {
  LOAD_FELLOW_LMS_RATINGS_REQUEST,
  LOAD_FELLOW_LMS_RATINGS_SUCCESS,
  LOAD_FELLOW_LMS_RATINGS_FAILURE
} from '../constants/fellowLmsRatings';

const fellowLmsRatingsReducer = (
  state = initialState.fellowLmsRatings,
  action
) => {
  switch (action.type) {
    case LOAD_FELLOW_LMS_RATINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_FELLOW_LMS_RATINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.lmsRatings
      };

    case LOAD_FELLOW_LMS_RATINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowLmsRatingsReducer;
