import initialState from './initialState';
import {
  CREATE_PROJECT_VACANCIES_REQUEST,
  CREATE_PROJECT_VACANCIES_SUCCESS,
  CREATE_PROJECT_VACANCIES_FAILURE
} from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.createProjectVacancies, action) =>
  genericReducer(
    [
      CREATE_PROJECT_VACANCIES_REQUEST,
      CREATE_PROJECT_VACANCIES_SUCCESS,
      CREATE_PROJECT_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
