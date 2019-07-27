import genericReducer from './genericReducer';
import * as types from '../constants/applyForRoleTypes';
import initialState from './initialState';

const applyForRoleReducer = (state = initialState.applyRole, action) =>
  genericReducer(
    [types.APPLYREQUEST, types.APPLYSUCCESS, types.APPLYFAILURE],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default applyForRoleReducer;
