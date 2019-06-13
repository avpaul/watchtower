import initialState from './initialState';
import {
  RETRIEVE_PROJECT_TECH_REQUEST,
  RETRIEVE_PROJECT_TECH_SUCCESS,
  RETRIEVE_PROJECT_TECH_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.fetchProjectTechnologies, action) =>
  genericReducer(
    [
      RETRIEVE_PROJECT_TECH_REQUEST,
      RETRIEVE_PROJECT_TECH_SUCCESS,
      RETRIEVE_PROJECT_TECH_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
