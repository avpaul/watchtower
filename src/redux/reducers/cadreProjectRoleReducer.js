import initialState from './initialState';
import * as types from '../constants/cadreProjectRolesTypes';
import genericReducer from './genericReducer';

const fetchProjectsReducer = (state = initialState.fetchAllProjects, action) =>
  genericReducer(
    [
      types.FETCH_PROJECT_ROLES_REQUEST,
      types.FETCH_PROJECT_ROLES_SUCCESS,
      types.FETCH_PROJECT_ROLES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fetchProjectsReducer;
