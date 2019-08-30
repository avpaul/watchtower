import getAProjectReducer from '../getAProjectReducer';
import * as types from '../../constants/projectsTypes';

describe('Get a project reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(getAProjectReducer(undefined, {})).toEqual({
      loading: false,
      data: {},
      error: {}
    });
  });

  it('should set loading state on fetching project data', () => {
    const newState = {
      loading: true,
      error: {},
      data: {}
    };
    const action = { type: types.GET_SINGLE_PROJECT_REQUEST };
    expect(getAProjectReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add fetched project to state', () => {
    const newState = {
      loading: false,
      data: {
        1: {
          id: 1
        }
      }
    };
    const action = {
      type: types.GET_SINGLE_PROJECT_SUCCESS,
      data: {
        project: [
          {
            id: 1
          }
        ]
      }
    };

    expect(getAProjectReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add the error message on failing to fetch vacancies', () => {
    const newState = {
      loading: false,
      error: { message: 'error when fetching project' },
      data: {}
    };
    const action = {
      type: types.GET_SINGLE_PROJECT_FAILURE,
      error: { message: 'error when fetching project' }
    };

    expect(getAProjectReducer(undefined, action)).toMatchObject(newState);
  });
});
