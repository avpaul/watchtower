import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

const fetchProjectsReducer = (state = initialState.allProjects, action) =>
  genericReducer(
    [
      types.FETCH_PROJECTS_REQUEST,
      types.FETCH_PROJECTS_SUCCESS,
      types.FETCH_PROJECTS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fetchProjectsReducer;
