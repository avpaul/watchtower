import getAllVacanciesReducer from '../getAllVacanciesReducer';
import {
  GET_ALL_VACANCIES_FAILURE,
  GET_ALL_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_REQUEST,
  UPDATE_PROJECT_VACANCIES_ON_FOCUS
} from '../../constants/projectsTypes';
import initialState from '../initialState';
import vacancyGroupMock, {
  generateVacancyGroups
} from '../../../__mocks__/projectVacancy';

it('should return the initial state for unknown action type', () => {
  expect(getAllVacanciesReducer(undefined, {})).toEqual({
    loading: false,
    data: [],
    error: null
  });
});

it('should set loading state on fetching vacancies data', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: GET_ALL_VACANCIES_REQUEST };
  expect(getAllVacanciesReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched vacancies to state', () => {
  const newState = {
    loading: false,
    data: []
  };
  const action = {
    type: GET_ALL_VACANCIES_SUCCESS,
    data: []
  };

  expect(getAllVacanciesReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch vacancies', () => {
  const newState = {
    loading: false,
    error: { message: 'error when fetching vacancies' },
    data: []
  };
  const action = {
    type: GET_ALL_VACANCIES_FAILURE,
    error: { message: 'error when fetching vacancies' }
  };

  expect(getAllVacanciesReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch vacancies', () => {
  const state = {
    ...initialState.getAllVacancies,
    data: {
      projectVacancies: [vacancyGroupMock]
    }
  };

  const newVacancy = generateVacancyGroups(1, 2)[0];
  const newState = {
    loading: false,
    error: null,
    data: {
      projectVacancies: [newVacancy]
    }
  };

  const action = {
    type: UPDATE_PROJECT_VACANCIES_ON_FOCUS,
    data: newVacancy
  };

  expect(getAllVacanciesReducer(state, action)).toMatchObject(newState);
});
