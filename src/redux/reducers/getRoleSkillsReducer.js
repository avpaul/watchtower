import initialState from './initialState';
import * as types from '../constants/cadreProjectRolesTypes';
import genericReducer from './genericReducer';

const GetRoleSkillsReducer = (state = initialState.roleSkills, action) =>
  genericReducer(
    [
      types.FETCH_ROLE_SKILLS_REQUEST,
      types.FETCH_ROLE_SKILLS_SUCCESS,
      types.FETCH_ROLE_SKILLS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default GetRoleSkillsReducer;
