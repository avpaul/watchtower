import * as types from '../constants/cadreEngineersTypes';
import initialState from './initialState';

const cadreEngineersReducer = (state = initialState.d1Engineers, action) => {
  switch (action.type) {
    case types.FETCH_CADRE_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_CADRE_SUCCESS:
      return { ...state, cadreEngineers: action.engineers, loading: false };
    case types.FETCH_CADRE_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default cadreEngineersReducer;
