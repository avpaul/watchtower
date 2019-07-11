import * as types from '../constants/cadreEngineersTypes';
import initialState from './initialState';

const updateActivationStatus = (cadreEngineers, activatedAccount) => {
  const existingEngineers = [...cadreEngineers];
  const accountToActivate = existingEngineers.find(
    engineer => engineer.email === activatedAccount.email
  );
  accountToActivate.account_active = true;
  return existingEngineers;
};

const cadreEngineersReducer = (state = initialState.cadreEngineers, action) => {
  switch (action.type) {
    case types.FETCH_CADRE_REQUEST:
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_CADRE_SUCCESS:
      return { ...state, cadreEngineers: action.engineers, loading: false };
    case types.FETCH_CADRE_FAILURE:
      return { ...state, error: action.error };
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        cadreEngineers: updateActivationStatus(
          state.cadreEngineers.data,
          action.engineer
        ),
        error: ''
      };
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default cadreEngineersReducer;
