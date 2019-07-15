import cadreProjectRoleReducer, {
  withDeleteProjectRole
} from '../cadreProjectRoleReducer';
import {
  FETCH_PROJECT_ROLES_REQUEST,
  FETCH_PROJECT_ROLES_SUCCESS,
  SET_PROJECT_ROLE_DELETE_TARGET,
  DELETE_PROJECT_ROLE,
  DELETE_PROJECT_ROLE_FAILURE
} from '../../constants/cadreProjectRolesTypes';

import initialState from '../initialState';

describe('cadre project role reducer tests', () => {
  const reducer = withDeleteProjectRole(cadreProjectRoleReducer);

  it('should return the initial state for unknown action type', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      data: initialState.fetchAllRoles.data,
      error: null
    });
  });

  it('should set loading state to true', () => {
    expect(
      reducer(undefined, {
        type: FETCH_PROJECT_ROLES_REQUEST
      })
    ).toMatchObject({
      ...initialState.fetchAllRoles,
      loading: true
    });
  });

  it('should update project role data', () => {
    expect(
      reducer(undefined, {
        type: FETCH_PROJECT_ROLES_SUCCESS,
        data: []
      })
    ).toMatchObject({
      ...initialState.fetchAllRoles,
      data: []
    });
  });

  it('should set error property when FETCH_PROJECT_ROLES_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: DELETE_PROJECT_ROLE_FAILURE,
        error: 'this is an error message'
      })
    ).toMatchObject({
      ...initialState.fetchAllRoles,
      error: 'this is an error message'
    });
  });

  it('should remove role from roles property when deleted', () => {
    const roles = [
      {
        id: 1,
        dummy: 'wohoo'
      }
    ];

    const allRoles = {
      ...initialState.fetchAllRoles,
      data: roles
    };

    expect(
      reducer(allRoles, {
        type: DELETE_PROJECT_ROLE,
        data: { role: 1 }
      })
    ).toMatchObject({
      ...initialState.fetchAllRoles
    });
  });

  it('should set proper delete target', () => {
    expect(
      reducer(undefined, {
        type: SET_PROJECT_ROLE_DELETE_TARGET,
        data: 1
      })
    ).toMatchObject({
      ...initialState.fetchAllRoles,
      deleteTarget: 1
    });
  });
});
