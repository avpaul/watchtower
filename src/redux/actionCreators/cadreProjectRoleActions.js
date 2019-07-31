import axios from 'axios';
import { genericAPIGetRequest, genericAPIPostRequest } from './helpers';
import * as types from '../constants/cadreProjectRolesTypes';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;

/**
 * An action creator responsible for fetching all projects
 * @return object An instance of a Promise
 */
export const fetchAllRoles = () =>
  genericAPIGetRequest('projects/roles', [
    types.FETCH_PROJECT_ROLES_REQUEST,
    types.FETCH_PROJECT_ROLES_SUCCESS,
    types.FETCH_PROJECT_ROLES_FAILURE
  ]);

/**
 * An action creator responsible for creating a role
 * @return object An instance of a Promise
 */
export const createNewRole = roleData =>
  genericAPIPostRequest(
    'projects/roles',
    [
      types.CREATE_PROJECT_ROLE_REQUEST,
      types.CREATE_PROJECT_ROLE_SUCCESS,
      types.CREATE_PROJECT_ROLE_FAILURE
    ],
    roleData
  );

/**
 * An action creator responsible for fetching all role skills
 * @return object An instance of a Promise
 */
export const getRoleSkills = () =>
  genericAPIGetRequest('projects/roles/skills', [
    types.FETCH_ROLE_SKILLS_REQUEST,
    types.FETCH_ROLE_SKILLS_SUCCESS,
    types.FETCH_ROLE_SKILLS_FAILURE
  ]);

export const setDeleteTarget = role => ({
  type: types.SET_PROJECT_ROLE_DELETE_TARGET,
  data: role.id
});

export const deleteRole = role => ({
  type: types.DELETE_PROJECT_ROLE,
  data: { role }
});

export const deleteRoleFailure = error => ({
  type: types.DELETE_PROJECT_ROLE_FAILURE,
  error
});

export const deleteRoleRequest = () => (dispatch, getState) => {
  const { allRoles } = getState();

  return axios
    .delete(`${serverUrl}/api/v2/projects/roles/${allRoles.deleteTarget}`)
    .then(() => {
      dispatch(deleteRole(allRoles.deleteTarget));
    })
    .catch(error => {
      dispatch(deleteRoleFailure(error.response.data.message));
    });
};

/**
 * An action creator responsible for fetching all applicants for a single role
 * @return object An instance of a Promise
 */
export const getARole = roleId =>
  genericAPIGetRequest(`projects/roles/${roleId}`, [
    types.FETCH_SINGLE_ROLE_REQUEST,
    types.FETCH_SINGLE_ROLE_SUCCESS,
    types.FETCH_SINGLE_ROLE_FAILURE
  ]);
