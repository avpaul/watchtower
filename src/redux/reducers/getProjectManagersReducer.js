import initialState from './initialState';
import {
  RETRIEVE_PROJECT_MANAGERS_REQUEST,
  RETRIEVE_PROJECT_MANAGERS_SUCCESS,
  RETRIEVE_PROJECT_MANAGERS_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.fetchProjectManagers, action) =>
  genericReducer(
    [
      RETRIEVE_PROJECT_MANAGERS_REQUEST,
      RETRIEVE_PROJECT_MANAGERS_SUCCESS,
      RETRIEVE_PROJECT_MANAGERS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
