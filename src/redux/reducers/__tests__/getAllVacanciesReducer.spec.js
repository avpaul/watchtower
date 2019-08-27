import getAllVacanciesReducer from '../getAllVacanciesReducer';
import {
  GET_ALL_VACANCIES_FAILURE,
  GET_ALL_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_REQUEST,
  UPDATE_PROJECT_VACANCIES_ON_FOCUS,
  REMOVE_PROJECT_VACANCIES_ON_FOCUS
} from '../../constants/projectsTypes';
import { REMOVE_CERTIFICATION_VACANCIES_ON_FOCUS } from '../../constants/certificationVacanciesTypes';
import initialState from '../initialState';
import { generateVacancyGroups } from '../../../__mocks__/projectVacancy';
import { getCertificationVacancies} from '../../../__mocks__/certificationVacancy';


describe('Get all vacancies reducer', () => {
  const projectVacancies = generateVacancyGroups(5, 2);
  projectVacancies[0].project.id = 12;
  projectVacancies[0].role.id = 6;

  const certificationVacancies = getCertificationVacancies(3);
  const defaultState = {
    ...initialState.getAllVacancies,
    data: {
      projectVacancies,
      certificationVacancies
    }
  };

  it('should return the initial state for unknown action type', () => {
    expect(getAllVacanciesReducer(undefined, {})).toEqual({
      loading: false,
      data: {},
      error: {}
    });
  });

  it('should set loading state on fetching vacancies data', () => {
    const newState = {
      loading: true,
      error: {},
      data: {}
    };
    const action = { type: GET_ALL_VACANCIES_REQUEST };
    expect(getAllVacanciesReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add fetched vacancies to state', () => {
    const newState = {
      loading: false,
      data: {}
    };
    const action = {
      type: GET_ALL_VACANCIES_SUCCESS,
      data: {}
    };

    expect(getAllVacanciesReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add the error message on failing to fetch vacancies', () => {
    const newState = {
      loading: false,
      error: { message: 'error when fetching vacancies' },
      data: {}
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
        ...projectVacancies[0],
        old_project_id: projectVacancies[0].project.id,
        old_project_role_id: projectVacancies[0].role.id
      }
    };

    expect(getAllVacanciesReducer(defaultState, action)).toMatchObject({
      loading: false,
      error: {},
      data: {
        projectVacancies
      }
    });
  });

  it('should remove a project vacancy group from project vacancies', () => {
    const action = {
      type: REMOVE_PROJECT_VACANCIES_ON_FOCUS,
      data: {
        ...projectVacancies[0],
        old_project_id: projectVacancies[0].project.id,
        old_project_role_id: projectVacancies[0].role.id
      }
    };

    expect(getAllVacanciesReducer(defaultState, action)).toMatchObject({
      loading: false,
      error: {},
      data: {
        projectVacancies: projectVacancies.splice(1, 4),
        certificationVacancies
      }
    });
  });

  it('should remove a certificate vacancy group from certificate vacancies', () => {
    const action = {
      type: REMOVE_CERTIFICATION_VACANCIES_ON_FOCUS,
      data: {
        ...certificationVacancies[0],
      }
    };

    expect(getAllVacanciesReducer(defaultState, action)).toMatchObject({
      loading: false,
      error: {},
      data: {
        certificationVacancies: certificationVacancies.splice(1, 2),
        projectVacancies
      }
    });
  });
});
