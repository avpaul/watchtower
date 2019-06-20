import initialState from './initialState';
import {
  FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
  FETCH_ROLE_ACTIVE_ENGINEER_REQUEST,
  FETCH_ROLE_ACTIVE_ENGINEER_FAILURE
} from '../constants/fellowActiveRolesTypes';

import genericReducer from './genericReducer';

const fellowActiveRoleReducer = (
  state = initialState.fetchActiveRole,
  action
) =>
  genericReducer(
    [
      FETCH_ROLE_ACTIVE_ENGINEER_REQUEST,
      FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
      FETCH_ROLE_ACTIVE_ENGINEER_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fellowActiveRoleReducer;
