import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.createProjectVacancies, action) =>
  genericReducer(
    [
      types.CREATE_PROJECT_VACANCIES_REQUEST,
      types.CREATE_PROJECT_VACANCIES_SUCCESS,
      types.CREATE_PROJECT_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
