import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for fetching all the project managers
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const fetchAllProjectManagers = () =>
  genericAPIGetRequest('projects/managers', [
    types.RETRIEVE_PROJECT_MANAGERS_REQUEST,
    types.RETRIEVE_PROJECT_MANAGERS_SUCCESS,
    types.RETRIEVE_PROJECT_MANAGERS_FAILURE
  ]);

/**
 * An action creator responsible for creating a new project manager
 *
 * @param object manager The project manager details
 * @return Action
 */
export const addProjectManager = manager => ({
  type: types.ADD_PROJECT_MANAGER,
  manager
});

export default {
  fetchAllProjectManagers
};
