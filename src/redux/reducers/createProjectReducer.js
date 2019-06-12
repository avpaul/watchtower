import initialState from './initialState';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

const createProjectReducer = (state = initialState.createProject, action) =>
  genericReducer(
    [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default createProjectReducer;
