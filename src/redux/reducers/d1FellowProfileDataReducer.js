import initialState from './initialState';
import * as types from '../constants/d1FellowProfileDataTypes';

const d1FellowBioReducer = (state = initialState.d1Fellow, action) => {
  switch (action.type) {
    case types.LOAD_D1_FELLOW_PROFILE_DATA_REQUEST:
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS:
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        fellow: action.fellow,
        error: null
      };

    case types.LOAD_D1_FELLOW_PROFILE_DATA_FAILURE:
    case types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default d1FellowBioReducer;
