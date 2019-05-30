import * as types from '../constants/pipDeactivationTypes';
import initialState from './initialState';

const deactivatePipReducer = (state = initialState.pipDeactivation, action) => {
  switch (action.type) {
    case types.DEACTIVATION_SUCCESS:
      return {
        ...state,
        success: true
      };
    case types.DEACTIVATION_FAILURE:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default deactivatePipReducer;
