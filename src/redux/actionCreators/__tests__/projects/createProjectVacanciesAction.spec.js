import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { createNewProjectVacancies } from '../../projectVacancyActions';
import initialState from '../../../reducers/initialState';

import {
  CREATE_PROJECT_VACANCIES_SUCCESS,
  CREATE_PROJECT_VACANCIES_REQUEST,
  CREATE_PROJECT_VACANCIES_FAILURE
} from '../../../constants/projectsTypes';

describe('Create project vacancies action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/vacancies`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the createProjectVacancies action according to the api response and the expected createProjectVacancies data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testCreateProjectAction = (
    expectedResponse,
    apiResponse = [
      201,
      { message: 'You have successfully created project vacancies!' }
    ]
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: CREATE_PROJECT_VACANCIES_REQUEST },
      expectedResponse
    ];

    store.dispatch(createNewProjectVacancies({})).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates CREATE_PROJECT_VACANCIES_SUCCESS when the post request completes successfully', () => {
    testCreateProjectAction({
      type: CREATE_PROJECT_VACANCIES_SUCCESS,
      data: {}
    });
  });

  it('creates CREATE_PROJECT_VACANCIES_FAILURE when the post request encounters an error', () => {
    testCreateProjectAction(
      {
        type: CREATE_PROJECT_VACANCIES_FAILURE,
        error: 'Project does not exists!'
      },
      [400, { message: 'Project does not exists!' }]
    );
  });
});
