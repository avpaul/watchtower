import initialState from './initialState';
import {
  LOAD_MANAGERFELLOWS_REQUEST,
  LOAD_MANAGERFELLOWS_SUCCESS,
  LOAD_MANAGERFELLOWS_FAILURE
} from '../constants/managerFellowTypes';

const managerFellowReducer = (state = initialState.managerFellows, action) => {
  switch (action.type) {
    case LOAD_MANAGERFELLOWS_REQUEST:
      return {
        ...state,
        managerFellows: {},
        loading: true,
        error: null
      };

    case LOAD_MANAGERFELLOWS_SUCCESS:
      return {
        ...state,
        loading: false,
        managerFellows: action.managerFellows
      };

    case LOAD_MANAGERFELLOWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default managerFellowReducer;
