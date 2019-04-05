import initialState from './initialState';
import {
  LOAD_FELLOW_PULSE_REQUEST,
  LOAD_FELLOW_PULSE_SUCCESS,
  LOAD_FELLOW_PULSE_FAILURE
} from '../constants/fellowActionTypes';

const fellowDevPulseReducer = (state = initialState.fellowDevPulse, action) => {
  switch (action.type) {
    case LOAD_FELLOW_PULSE_REQUEST:
      return {
        ...state,
        ratings: [],
        loading: true,
        error: null
      };

    case LOAD_FELLOW_PULSE_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: action.ratings,
        lmsSubmissions: action.lmsSubmissions
      };

    case LOAD_FELLOW_PULSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default fellowDevPulseReducer;
