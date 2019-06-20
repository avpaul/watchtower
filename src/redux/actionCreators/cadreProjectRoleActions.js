import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/cadreProjectRolesTypes';

/**
 * An action creator responsible for fetching all projects
 * @return object An instance of a Promise
 */
export const fetchAllRoles = () =>
  genericAPIGetRequest('ops/roles', [
    types.FETCH_PROJECT_ROLES_REQUEST,
    types.FETCH_PROJECT_ROLES_SUCCESS,
    types.FETCH_PROJECT_ROLES_FAILURE
  ]);

export default {
  fetchAllRoles
};
