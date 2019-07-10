import {
  genericAPIPostRequest,
  genericAPIGetRequest,
  genericAPIPutRequest
} from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for creating a new project
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const createNewProject = projectData =>
  genericAPIPostRequest(
    'projects',
    [
      types.CREATE_PROJECT_REQUEST,
      types.CREATE_PROJECT_SUCCESS,
      types.CREATE_PROJECT_FAILURE
    ],
    projectData
  );

/**
 * An action creator responsible for creating a new project
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const editProject = projectData =>
  genericAPIPutRequest(
    `projects/${projectData.id}`,
    [
      types.EDIT_PROJECT_REQUEST,
      types.EDIT_PROJECT_SUCCESS,
      types.EDIT_PROJECT_FAILURE
    ],
    projectData
  );

/**
 * An action creator responsible for fetching a single project
 * @return object An instance of a Promise
 */
export const getAProject = projectId =>
  genericAPIGetRequest(`projects/${projectId}`, [
    types.GET_SINGLE_PROJECT_REQUEST,
    types.GET_SINGLE_PROJECT_SUCCESS,
    types.GET_SINGLE_PROJECT_FAILURE
  ]);

/**
 * An action creator responsible for fetching all projects
 * @return object An instance of a Promise
 */
export const fetchAllProjects = () =>
  genericAPIGetRequest('projects', [
    types.FETCH_PROJECTS_REQUEST,
    types.FETCH_PROJECTS_SUCCESS,
    types.FETCH_PROJECTS_FAILURE
  ]);

export default {
  createNewProject,
  fetchAllProjects,
  editProject,
  getAProject
};
