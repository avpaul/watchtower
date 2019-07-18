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

  export const withDeleteProject = reducer => (
    state = initialState.allProjects, 
    action) => {
    switch (action.type) {
      case types.DELETE_PROJECT_REQUEST:
        return {
          ...state,
          data: state.data.filter(
            project => project.id !== action.data.project
          )
        };
      case types.DELETE_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case types.SET_PROJECT_DELETE_TARGET:
        return {
          ...state,
          deleteTarget: action.data
        };
      default:
        return reducer(state, action);
    }
  };

export default fetchProjectsReducer;
