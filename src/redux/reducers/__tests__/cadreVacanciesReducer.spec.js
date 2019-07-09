import cadreVacanciesReducer from '../cadreVacanciesReducer';
import {
  FETCH_CADREVACANCIES_REQUEST,
  FETCH_CADREVACANCIES_SUCCESS,
  FETCH_CADREVACANCIES_FAILURE
} from '../../constants/cadreVacanciesTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(cadreVacanciesReducer(undefined, {})).toEqual({
    loading: false,
    data: initialState.cadreVacancies.data,
    error: null
  });
});

it('should set loading state on retrieving all vacancies', () => {
  const action = { type: FETCH_CADREVACANCIES_REQUEST };
  expect(cadreVacanciesReducer(undefined, action)).toMatchObject({
    ...initialState.cadreVacancies,
    loading: true
  });
});

it('should execute the success action when data retrieval is successful', () => {
  const action = {
    type: FETCH_CADREVACANCIES_SUCCESS,
    data: { message: '', vacancies: [], certifications: [] }
  };

  const newState = {
    ...initialState.cadreVacancies,
    loading: false,
    data: action.data
  };

  expect(cadreVacanciesReducer(undefined, action)).toMatchObject(newState);
});

it('should execute the failure action type when vacancy retrieval fails', () => {
  const action = {
    type: FETCH_CADREVACANCIES_FAILURE,
    error: { message: 'error message' }
  };

  const newState = {
    ...initialState.createProject,
    error: action.error
  };

  expect(cadreVacanciesReducer(undefined, action)).toMatchObject(newState);
});
