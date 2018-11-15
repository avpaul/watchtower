import {
  LOAD_TTLS_FAILURE,
  LOAD_TTLS_SUCCESS,
  LOAD_TTLS_REQUEST
} from '../constants/ttlTypes';
import initialState from './initialState';

const ttlReducer = (state = initialState.ttls, action) => {
  switch (action.type) {
    case LOAD_TTLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_TTLS_SUCCESS:
      return {
        ...state,
        loading: false,
        ttls: action.ttls
      };

    case LOAD_TTLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default ttlReducer;
