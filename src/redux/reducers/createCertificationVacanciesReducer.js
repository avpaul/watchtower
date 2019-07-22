import initialState from './initialState';
import * as types from '../constants/certificationVacanciesTypes';
import genericReducer from './genericReducer';

export default (state = initialState.createProjectVacancies, action) =>
  genericReducer(
    [
      types.CREATE_CERTIFICATION_VACANCY_REQUEST,
      types.CREATE_CERTIFICATION_VACANCY_SUCCESS,
      types.CREATE_CERTIFICATION_VACANCY_FAIL
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
