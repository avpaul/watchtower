import initialState from './initialState';
import {
  EDIT_PROJECT_VACANCIES_REQUEST,
  EDIT_PROJECT_VACANCIES_SUCCESS,
  EDIT_PROJECT_VACANCIES_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.editProjectVacancies, action) =>
  genericReducer(
    [
      EDIT_PROJECT_VACANCIES_REQUEST,
      EDIT_PROJECT_VACANCIES_SUCCESS,
      EDIT_PROJECT_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
