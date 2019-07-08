import { genericAPIGetRequest, genericAPIPostRequest } from './helpers';
import * as types from '../constants/cadreProjectRolesTypes';

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
