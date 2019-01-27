import initialState from './initialState';
import * as types from '../constants/simulationsLeadTypes';

const simulationsLeadLfsReducer = (
  state = initialState.simulationsLeadLfs,
  action
) => {
  switch (action.type) {
    case types.LOAD_SIMULATIONS_LEAD_LF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOAD_SIMULATIONS_LEAD_LF_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case types.LOAD_SIMULATIONS_LEAD_LF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default simulationsLeadLfsReducer;
