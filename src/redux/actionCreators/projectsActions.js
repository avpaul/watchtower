import { genericAPIPostRequest } from './helpers';
import {
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST
} from '../constants/projectsTypes';

/**
 * An action creator responsible for creating a new project
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const createNewProject = projectData =>
  genericAPIPostRequest(
    'ops/projects',
    [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
    projectData
  );

export default {
  createNewProject
};
