import deleteProjectVacanciesReducer from '../deleteProjectVacanciesReducer';
import {
  DELETE_PROJECT_VACANCIES_REQUEST,
  DELETE_PROJECT_VACANCIES_SUCCESS,
  DELETE_PROJECT_VACANCIES_FAILURE
} from '../../constants/projectsTypes';
import initialState from '../initialState';

describe('Delete project vacancies reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(deleteProjectVacanciesReducer(undefined, {})).toEqual(
      initialState.deleteProjectVacancies
    );
  });

  it('should set loading state on deleting project vacancies', () => {
    const action = { type: DELETE_PROJECT_VACANCIES_REQUEST };
    expect(deleteProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.deleteProjectVacancies,
      loading: true
    });
  });

  it('should be able to add success message to state', () => {
    const action = {
      type: DELETE_PROJECT_VACANCIES_SUCCESS,
      data: { message: 'Success!' }
    };

    expect(deleteProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.deleteProjectVacancies,
      data: action.data
    });
  });

  it('should add the error message on failing to delete project vacancies', () => {
    const action = {
      type: DELETE_PROJECT_VACANCIES_FAILURE,
      error: { message: 'error' }
    };

    expect(deleteProjectVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.deleteProjectVacancies,
      error: action.error
    });
  });
});
