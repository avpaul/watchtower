import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for fetching all the project managers
 * @param object projectData The details of the new project
 * @return object An instance of a Promise
 */
export const fetchAllProjectTechnologies = () =>
  genericAPIGetRequest('projects/technologies', [
    types.RETRIEVE_PROJECT_TECH_REQUEST,
    types.RETRIEVE_PROJECT_TECH_SUCCESS,
    types.RETRIEVE_PROJECT_TECH_FAILURE
  ]);

/**
 * An action creator responsible for adding a new project technology to the project form
 * @param string tech The name of the technology
 * @return Action
 */
export const addProjectTechnology = tech => ({
  type: types.ADD_PROJECT_TECHNOLOGY,
  data: tech
});

export default {
  fetchAllProjectTechnologies
};
