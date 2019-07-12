import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.editProjectVacancies, action) =>
  genericReducer(
    [
      types.DELETE_PROJECT_VACANCIES_REQUEST,
      types.DELETE_PROJECT_VACANCIES_SUCCESS,
      types.DELETE_PROJECT_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
