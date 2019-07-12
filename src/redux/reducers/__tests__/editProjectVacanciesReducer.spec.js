import editProjectVacanciesReducer from '../editProjectVacanciesReducer';
import {
  EDIT_PROJECT_VACANCIES_REQUEST,
  EDIT_PROJECT_VACANCIES_SUCCESS,
  EDIT_PROJECT_VACANCIES_FAILURE
} from '../../constants/projectsTypes';
import initialState from '../initialState';

describe('Edit project vacancies reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(editProjectVacanciesReducer(undefined, {})).toEqual(
      initialState.editProjectVacancies
    );
  });

  it('should set loading state on updating a set project vacancies', () => {
    const action = { type: EDIT_PROJECT_VACANCIES_REQUEST };
    expect(editProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editProjectVacancies,
      loading: true
    });
  });

  it('should execute the success action type case on successful update', () => {
    const action = {
      type: EDIT_PROJECT_VACANCIES_SUCCESS,
      data: { message: 'Success!' }
    };

    expect(editProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editProjectVacancies,
      data: action.data
    });
  });

  it('should execute the failure action type case on failed update', () => {
    const action = {
      type: EDIT_PROJECT_VACANCIES_FAILURE,
      error: { message: 'error' }
    };

    expect(editProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.editProjectVacancies,
      error: action.error
    });
  });
});
