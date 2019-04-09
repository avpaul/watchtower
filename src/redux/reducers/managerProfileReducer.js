import {
  MANAGER_PROFILE_DATA_REQUEST,
  MANAGER_PROFILE_DATA_SUCCESS,
  MANAGER_PROFILE_DATA_FAILURE
} from '../constants/managerActionTypes';
import initialState from './initialState';

const managerProfileReducer = (state = initialState.manager, action) => {
  switch (action.type) {
    case MANAGER_PROFILE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case MANAGER_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case MANAGER_PROFILE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default managerProfileReducer;
