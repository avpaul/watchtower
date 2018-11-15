import {
  LOAD_FELLOW_PROGRESS_REQUEST,
  LOAD_FELLOW_PROGRESS_SUCCESS,
  LOAD_FELLOW_PROGRESS_FAILURE
} from '../constants/fellowProgressTypes';
import initialState from './initialState';

const fellowProgressReducer = (
  state = initialState.fellowsProgress,
  action
) => {
  switch (action.type) {
    case LOAD_FELLOW_PROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_FELLOW_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        fellowsProgressD0A: action.fellowsProgressD0A,
        fellowsProgressD0B: action.fellowsProgressD0B
      };

    case LOAD_FELLOW_PROGRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowProgressReducer;
