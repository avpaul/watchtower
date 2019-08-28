import editCertificationVacanciesReducer from '../editCertificationVacanciesReducer';
import {
  EDIT_CERTIFICATION_VACANCY_REQUEST,
  EDIT_CERTIFICATION_VACANCY_SUCCESS,
  EDIT_CERTIFICATION_VACANCY_FAILURE
} from '../../constants/certificationVacanciesTypes';
import initialState from '../initialState';

describe('Edit certification vacancies reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(editCertificationVacanciesReducer(undefined, {})).toEqual(
      initialState.editCertificationVacancies
    );
  });

  it('should set loading state on updating a set certification vacancies', () => {
    const action = { type: EDIT_CERTIFICATION_VACANCY_REQUEST };
    expect(editCertificationVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editCertificationVacancies,
      loading: true
    });
  });

  it('should execute the success action type case on successful update', () => {
    const action = {
      type: EDIT_CERTIFICATION_VACANCY_SUCCESS,
      data: { message: 'Success!' }
    };

    expect(editCertificationVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editCertificationVacancies,
      data: action.data
    });
  });

  it('should execute the failure action type case on failed update', () => {
    const action = {
      type: EDIT_CERTIFICATION_VACANCY_FAILURE,
      error: { message: 'error' }
    };

    expect(editCertificationVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editCertificationVacancies,
      error: action.error
    });
  });
});
