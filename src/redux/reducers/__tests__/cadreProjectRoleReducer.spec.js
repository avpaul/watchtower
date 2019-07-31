import cadreProjectRoleReducer, {
  withDeleteProjectRole,
  fetchSingleRoleReducer
} from '../cadreProjectRoleReducer';
import {
  FETCH_PROJECT_ROLES_REQUEST,
  FETCH_PROJECT_ROLES_SUCCESS,
  SET_PROJECT_ROLE_DELETE_TARGET,
  DELETE_PROJECT_ROLE,
  DELETE_PROJECT_ROLE_FAILURE,
  FETCH_SINGLE_ROLE_REQUEST,
  FETCH_SINGLE_ROLE_SUCCESS,
  FETCH_SINGLE_ROLE_FAILURE
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

  it('should set loading state on fetching certification applicants', () => {
    const newState = {
      loading: true,
      error: null,
      data: []
    };
    const action = { type: FETCH_SINGLE_ROLE_REQUEST };
    expect(fetchSingleRoleReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add fetched applicants to state', () => {
    const action = {
      type: FETCH_SINGLE_ROLE_SUCCESS,
      data: [
        {
          id: 16,
          fellow_id: '-LP5MeqRJFJQGKwfG1vr',
          first_name: 'Lindsey',
          last_name: 'Patra',
          email: 'lindsey.patra@andela.com',
          picture: 'https://lorempixel.com/100/100/people?35451',
          cohort: 'Lagos-8',
          sims_project: 'AuthorsHaven',
          sims_project_technology: 'Python-Go',
          sims_start_date: '2018-11-13 00:00:00',
          sims_end_date: '2019-02-18 00:00:00',
          cadre_start_date: null,
          sims_manager: 'Daniel Ale',
          apprenticeship_project: 'WatchTower',
          apprenticeship_technology: 'PHP-Lumen',
          apprenticeship_start_date: '2019-06-03 00:00:00',
          apprenticeship_end_date: '2019-06-18 00:00:00',
          apprenticeship_manager: 'Olaolu Akinsete',
          account_active: false,
          email_sent: false,
          project_id: null,
          project_role_id: null,
          created_at: null,
          updated_at: null,
          project_certifications_id: 21
        }
      ]
    };

    const newState = {
      loading: false,
      error: null,
      data: [...action.data]
    };

    expect(fetchSingleRoleReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add the error message on failing to fetch fellow', () => {
    const newState = {
      loading: false,
      error: { message: 'You messed up again' },
      data: []
    };

    const action = {
      type: FETCH_SINGLE_ROLE_FAILURE,
      error: { message: 'You messed up again' }
    };

    expect(fetchSingleRoleReducer(undefined, action)).toMatchObject(newState);
  });
});
