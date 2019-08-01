import createProjectVacanciesReducer from '../createProjectVacanciesReducer';
import {
  CREATE_PROJECT_VACANCIES_REQUEST,
  CREATE_PROJECT_VACANCIES_SUCCESS,
  CREATE_PROJECT_VACANCIES_FAILURE
} from '../../constants/projectsTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(createProjectVacanciesReducer(undefined, {})).toEqual({
    loading: false,
    data: initialState.createProjectVacancies.data,
    error: {}
  });
});

it('should set loading state on posting a new project', () => {
  const action = { type: CREATE_PROJECT_VACANCIES_REQUEST };
  expect(createProjectVacanciesReducer(undefined, action)).toMatchObject({
    ...initialState.createProjectVacancies,
    loading: true
  });
});

it('should execute the success action type case on successful post', () => {
  const action = {
    type: CREATE_PROJECT_VACANCIES_SUCCESS,
    data: {}
  };

  const newState = {
    ...initialState.createProjectVacancies,
    data: action.data
  };

  expect(createProjectVacanciesReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should execute the failure action type case on failed post', () => {
  const action = {
    type: CREATE_PROJECT_VACANCIES_FAILURE,
    error: { message: 'error' }
  };

  const newState = {
    ...initialState.createProjectVacancies,
    error: action.error
  };

  expect(createProjectVacanciesReducer(undefined, action)).toMatchObject(
    newState
  );
});
