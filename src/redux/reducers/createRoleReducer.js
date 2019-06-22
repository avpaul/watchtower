import initialState from './initialState';
import * as types from '../constants/cadreProjectRolesTypes';
import genericReducer from './genericReducer';

const CreateRolesReducer = (state = initialState.createRole, action) =>
  genericReducer(
    [
      types.CREATE_PROJECT_ROLE_REQUEST,
      types.CREATE_PROJECT_ROLE_SUCCESS,
      types.CREATE_PROJECT_ROLE_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default CreateRolesReducer;
