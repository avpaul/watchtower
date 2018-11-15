import {
  LOAD_LOCATIONS_FAILURE,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_REQUEST
} from '../constants/locationsTypes';
import initialState from './initialState';

const locationReducer = (state = initialState.locations, action) => {
  switch (action.type) {
    case LOAD_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.locations
      };

    case LOAD_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default locationReducer;
