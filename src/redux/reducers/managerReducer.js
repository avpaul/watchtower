import initialState from './initialState';
import {
  LOAD_MANAGER_REQUEST,
  LOAD_MANAGER_SUCCESS,
  LOAD_MANAGER_FAILURE
} from '../constants/managerActionTypes';

const managerReducer = (state = initialState.managers, action) => {
  switch (action.type) {
    case LOAD_MANAGER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_MANAGER_SUCCESS:
      return {
        ...state,
        ...action.managers,
        loading: false
      };

    case LOAD_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default managerReducer;
