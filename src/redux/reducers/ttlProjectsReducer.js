import {
  TTL_PROJECTS_REQUEST,
  TTL_PROJECTS_SUCCESS,
  TTL_PROJECTS_FAILURE
} from '../constants/ttlTypes';
import initialState from './initialState';

const ttlProjectsReducer = (state = initialState.ttlProjects, action) => {
  switch (action.type) {
    case TTL_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TTL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects
      };

    case TTL_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default ttlProjectsReducer;
