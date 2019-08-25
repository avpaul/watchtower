import initialState from './initialState';
import * as types from '../constants/certificationVacanciesTypes';
import genericReducer from './genericReducer';

export default (state = initialState.deleteCertification, action) =>
  genericReducer(
    [
      types.DELETE_CERTIFICATION_VACANCIES_REQUEST,
      types.DELETE_CERTIFICATION_VACANCIES_SUCCESS,
      types.DELETE_CERTIFICATION_VACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
