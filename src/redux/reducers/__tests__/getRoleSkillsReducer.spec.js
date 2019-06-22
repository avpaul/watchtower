import GetRoleSkillsReducer from '../getRoleSkillsReducer';
import * as types from '../../constants/cadreProjectRolesTypes';
import initialState from '../initialState';

describe('get role skills', () => {
  it('should return the initial state', () => {
    expect(GetRoleSkillsReducer(undefined, {})).toEqual(
      initialState.roleSkills
    );
  });

  it('should handle get role skills request', () => {
    const newState = {
      data: [],
      loading: true,
      error: null
    };
    const action = { type: types.FETCH_ROLE_SKILLS_REQUEST };
    expect(GetRoleSkillsReducer(initialState.roleSkills, action)).toEqual(
      newState
    );
  });

  it('should handle get role skills failure', () => {
    const error = 'there was an error processing request';
    const newState = {
      data: [],
      loading: false,
      error: 'there was an error processing request'
    };
    const action = { type: types.FETCH_ROLE_SKILLS_FAILURE, error };
    expect(GetRoleSkillsReducer(initialState.roleSkills, action)).toEqual(
      newState
    );
  });

  it('should handle get role skills success', () => {
    const data = ['skills'];
    const newState = {
      data: ['skills'],
      loading: false,
      error: null
    };
    const action = { type: types.FETCH_ROLE_SKILLS_SUCCESS, data };
    expect(GetRoleSkillsReducer(initialState.roleSkills, action)).toEqual(
      newState
    );
  });
});
