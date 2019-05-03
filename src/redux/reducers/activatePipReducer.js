import * as types from '../constants/pipActivationTypes';
import initialState from './initialState';

const activatePipReducer = (state = initialState.pipData, action) => {
  switch (action.type) {
    case types.ACTIVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.ACTIVATION_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case types.ACTIVATION_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
};

export default activatePipReducer;
