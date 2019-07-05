import createRoleReducer from '../createRoleReducer';
import * as types from '../../constants/cadreProjectRolesTypes';
import initialState from '../initialState';

describe('create role reducer', () => {
  it('should return the initial state', () => {
    expect(createRoleReducer(undefined, {})).toEqual(initialState.createRole);
  });

  it('should handle create role request', () => {
    const newState = {
      data: [],
      loading: true,
      error: null
    };
    const action = { type: types.CREATE_PROJECT_ROLE_REQUEST };
    expect(createRoleReducer(initialState.createRole, action)).toEqual(
      newState
    );
  });

  it('should handle create role failure', () => {
    const error = 'there was an error processing request';
    const newState = {
      data: [],
      loading: false,
      error: 'there was an error processing request'
    };
    const action = { type: types.CREATE_PROJECT_ROLE_FAILURE, error };
    expect(createRoleReducer(initialState.createRole, action)).toEqual(
      newState
    );
  });

  it('should handle create role success', () => {
    const data = { name: 'success', description: 'role creation!', skills: [] };
    const newState = {
      data,
      loading: false,
      error: null
    };
    const action = { type: types.CREATE_PROJECT_ROLE_SUCCESS, data };
    expect(createRoleReducer(initialState.createRole, action)).toEqual(
      newState
    );
  });
});
