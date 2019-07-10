import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { createNewProject } from '../../projectsActions';

import {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_FAILURE
} from '../../../constants/projectsTypes';

describe('Create project action', () => {
  const initialState = {
    createProject: {
      loading: false,
      data: {},
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the createProject action according to the api response and the expected createProject data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testCreateProjectAction = (
    expectedResponse,
    apiResponse = [201, { message: 'You have successfully created a project!' }]
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: CREATE_PROJECT_REQUEST },
      expectedResponse
    ];

    store.dispatch(createNewProject({})).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates CREATE_PROJECT_SUCCESS when the post request completes successfully', () => {
    testCreateProjectAction({
      type: CREATE_PROJECT_SUCCESS,
      data: {}
    });
  });

  it('creates CREATE_PROJECT_FAILURE when the post request encounters an error', () => {
    testCreateProjectAction(
      {
        type: CREATE_PROJECT_FAILURE,
        error: 'Name already exists!'
      },
      [400, { message: 'Name already exists!' }]
    );
  });
});
