import initialState from './initialState';
import * as types from '../constants/emsSimsLeadsTypes';

const emsSimsLeadsReducers = (
  state = initialState.engineeringManagerSimsLeads,
  action
) => {
  switch (action.type) {
    case types.LOAD_EM_SIMSLEADS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOAD_EM_SIMSLEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case types.LOAD_EM_SIMSLEADS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default emsSimsLeadsReducers;
