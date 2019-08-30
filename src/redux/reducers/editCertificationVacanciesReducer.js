import initialState from './initialState';
import {
    EDIT_CERTIFICATION_VACANCY_REQUEST,
    EDIT_CERTIFICATION_VACANCY_SUCCESS,
    EDIT_CERTIFICATION_VACANCY_FAILURE
} from '../constants/certificationVacanciesTypes';
import genericReducer from './genericReducer';

export default (state = initialState.editCertificationVacancies, action) =>
  genericReducer(
    [
      EDIT_CERTIFICATION_VACANCY_REQUEST,
      EDIT_CERTIFICATION_VACANCY_SUCCESS,
      EDIT_CERTIFICATION_VACANCY_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
