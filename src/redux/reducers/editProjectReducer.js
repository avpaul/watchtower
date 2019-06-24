import initialState from './initialState';
import {
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

const editProjectReducer = (state = initialState.editSingleProject, action) =>
  genericReducer(
    [EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, EDIT_PROJECT_FAILURE],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default editProjectReducer;
