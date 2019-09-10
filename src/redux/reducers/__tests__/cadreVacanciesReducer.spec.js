import cadreVacanciesReducer from '../cadreVacanciesReducer';
import * as types from '../../constants/cadreVacanciesTypes';
import initialState from '../initialState';

describe('Cadre Vacancies', () => {
  it('should return the initial state for unknown action type', () => {
    expect(cadreVacanciesReducer(undefined, {})).toEqual({
      loading: false,
      data: initialState.cadreVacancies.data,
      error: {}
    });
  });

  it('should set loading state on retrieving all vacancies', () => {
    const action = { type: types.FETCH_CADREVACANCIES_REQUEST };
    expect(cadreVacanciesReducer(undefined, action)).toMatchObject({
      ...initialState.cadreVacancies,
      loading: true
    });
  });

  it('should execute the success action when data retrieval is successful', () => {
    const action = {
      type: types.FETCH_CADREVACANCIES_SUCCESS,
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
      type: types.FETCH_CADREVACANCIES_FAILURE,
      error: { message: 'error message' }
    };

    const newState = {
      ...initialState.createProject,
      error: action.error
    };

    expect(cadreVacanciesReducer(undefined, action)).toMatchObject(newState);
  });
});

describe('Certification Application', () => {
  it('should handle certification application request', () => {
    expect(
      cadreVacanciesReducer(initialState.certificationApplication, {
        type: types.CERTIFICATION_APPLICATION_REQUEST
      })
    ).toEqual({ data: {}, error: {}, loading: true });
  });

  it('should handle certification application success', () => {
    const responseBody = {
      project_certifications_id: 14,
      fellowId: 21,
      updatedAt: '2019-07-10 20:04:22',
      createdAt: '2019-07-10 20:04:22',
      id: 2,
      cycle_id: 1
    };
    const currentState = {
      loading: false,
      data: {
        certificationVacancies: [
          {
            certification: {
              id: 14
            },
            vacancy_details: {
              cycle_id: 1,
              applications: []
            }
          }
        ]
      },
      error: null
    };

    expect(
      cadreVacanciesReducer(currentState, {
        type: types.CERTIFICATION_APPLICATION_SUCCESS,
        data: { ...responseBody }
      })
    ).toEqual({
      loading: false,
      error: null,
      data: {
        certificationVacancies: [
          {
            certification: {
              id: 14
            },
            vacancy_details: {
              cycle_id: 1,
              applications: [
                {
                  createdAt: '2019-07-10 20:04:22',
                  fellowId: 21,
                  id: 2,
                  project_certifications_id: 14,
                  updatedAt: '2019-07-10 20:04:22',
                  cycle_id: 1
                }
              ]
            }
          }
        ]
      }
    });
  });

  it('should handle certification application failure', () => {
    expect(
      cadreVacanciesReducer(initialState.certificationApplication, {
        type: types.CERTIFICATION_APPLICATION_FAILURE,
        error: 'testing'
      })
    ).toEqual({ error: 'testing', data: {}, loading: false });
  });
});

describe('Role Application', () => {
  it('should handle role application request', () => {
    expect(
      cadreVacanciesReducer(initialState.cadreVacancies, {
        type: types.ROLE_APPLICATION_REQUEST
      })
    ).toEqual({ data: {}, error: {}, loading: true });
  });

  it('should handle role application success', () => {
    const responseBody = {
      project_id: 1,
      fellowId: 21,
      updatedAt: '2019-07-10 20:04:22',
      createdAt: '2019-07-10 20:04:22',
      id: 2,
      cycle_id: 1,
      project_role_id: 1
    };
    const currentState = {
      loading: false,
      data: {
        newApplication: '1-1',
        hasApplied: true,
        projectVacancies: [
          {
            project: {
              id: 1
            },
            role: {
              id: 1
            },
            applications: [],
            vacancy: {
              cycle_id: 1
            }
          }
        ]
      },
      error: null
    };

    expect(
      cadreVacanciesReducer(currentState, {
        type: types.ROLE_APPLICATION_SUCCESS,
        data: { application: { ...responseBody } }
      })
    ).toEqual({
      loading: false,
      error: null,
      data: {
        hasApplied: true,
        newApplication: '1-1',
        projectVacancies: [
          {
            project: {
              id: 1
            },
            role: {
              id: 1
            },
            applications: [],
            vacancy: {
              cycle_id: 1,
              hasApplied: true
            }
          }
        ]
      }
    });
  });

  it('should handle role application failure', () => {
    expect(
      cadreVacanciesReducer(initialState.cadreVacancies, {
        type: types.ROLE_APPLICATION_FAILURE,
        error: 'testing errors now'
      })
    ).toEqual({ error: 'testing errors now', data: {}, loading: false });
  });
});
