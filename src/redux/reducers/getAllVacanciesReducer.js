import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

const getAllVacanciesReducer = (state = initialState.getAllVacancies, action) =>
  genericReducer(
    [
      types.GET_ALL_VACANCIES_REQUEST,
      types.GET_ALL_VACANCIES_SUCCESSS,
      types.GET_ALL_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default getAllVacanciesReducer;
