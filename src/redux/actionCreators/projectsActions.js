import { genericAPIPostRequest, genericAPIGetRequest } from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for creating a new project
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const createNewProject = projectData =>
  genericAPIPostRequest(
    'ops/projects',
    [
      types.CREATE_PROJECT_REQUEST,
      types.CREATE_PROJECT_SUCCESS,
      types.CREATE_PROJECT_FAILURE
    ],
    projectData
  );

/**
 * An action creator responsible for fetching all projects
 * @return object An instance of a Promise
 */
export const fetchAllProjects = () =>
  genericAPIGetRequest('ops/projects', [
    types.FETCH_PROJECTS_REQUEST,
    types.FETCH_PROJECTS_SUCCESS,
    types.FETCH_PROJECTS_FAILURE
  ]);

export default {
  createNewProject,
  fetchAllProjects
};
