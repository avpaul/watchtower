import getAllVacanciesReducer from '../getAllVacanciesReducer';
import {
  GET_ALL_VACANCIES_FAILURE,
  GET_ALL_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_REQUEST,
  UPDATE_PROJECT_VACANCIES_ON_FOCUS,
  REMOVE_PROJECT_VACANCIES_ON_FOCUS
} from '../../constants/projectsTypes';
import initialState from '../initialState';
import { generateVacancyGroups } from '../../../__mocks__/projectVacancy';

describe('Get all vacancies reducer', () => {
  const newVacancies = generateVacancyGroups(5, 2);
  newVacancies[0].project.id = 12;
  newVacancies[0].role.id = 6;

  const defaultState = {
    ...initialState.getAllVacancies,
    data: {
      projectVacancies: newVacancies
    }
  };

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

  it('should update list of vacancies', () => {
    const action = {
      type: UPDATE_PROJECT_VACANCIES_ON_FOCUS,
      data: {
        ...newVacancies[0],
        old_project_id: newVacancies[0].project.id,
        old_project_role_id: newVacancies[0].role.id
      }
    };

    expect(getAllVacanciesReducer(defaultState, action)).toMatchObject({
      loading: false,
      error: null,
      data: {
        projectVacancies: newVacancies
      }
    });
  });

  it('should remove a vacancy group from a list of vacancies', () => {
    const action = {
      type: REMOVE_PROJECT_VACANCIES_ON_FOCUS,
      data: {
        ...newVacancies[0],
        old_project_id: newVacancies[0].project.id,
        old_project_role_id: newVacancies[0].role.id
      }
    };

    expect(getAllVacanciesReducer(defaultState, action)).toMatchObject({
      loading: false,
      error: null,
      data: {
        projectVacancies: newVacancies.splice(1, 4)
      }
    });
  });
});
