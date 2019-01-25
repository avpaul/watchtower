import initialState from './initialState';
import * as types from '../constants/engineeringManagerTypes';

const engineeringManagerTtlsReducer = (
  state = initialState.engineeringManagerTtls,
  action
) => {
  switch (action.type) {
    case types.LOAD_ENGINEERING_MANAGER_TTLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case types.LOAD_ENGINEERING_MANAGER_TTLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default engineeringManagerTtlsReducer;
