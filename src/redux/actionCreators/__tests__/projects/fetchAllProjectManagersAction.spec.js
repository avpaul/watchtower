import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { fetchAllProjectManagers } from '../../projectManagerActions';

import {
  RETRIEVE_PROJECT_MANAGERS_SUCCESS,
  RETRIEVE_PROJECT_MANAGERS_REQUEST,
  RETRIEVE_PROJECT_MANAGERS_FAILURE
} from '../../../constants/projectsTypes';

describe('Fetch all project managers action', () => {
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
  const baseURL = `${serverURL}/api/v2/projects/managers`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the fetchAllProjectManager action according to the api response
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchAllProjectManagersAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: RETRIEVE_PROJECT_MANAGERS_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllProjectManagers({})).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates RETRIEVE_PROJECT_MANAGERS_SUCCESS when the GET request completes successfully', () => {
    testFetchAllProjectManagersAction({
      type: RETRIEVE_PROJECT_MANAGERS_SUCCESS,
      data: {}
    });
  });

  it('creates RETRIEVE_PROJECT_MANAGERS_FAILURE when the GET request encounters an error', () => {
    testFetchAllProjectManagersAction(
      {
        type: RETRIEVE_PROJECT_MANAGERS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
