import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { fetchAllProjectTechnologies } from '../../projectTechnologiesActions';

import {
  RETRIEVE_PROJECT_TECH_SUCCESS,
  RETRIEVE_PROJECT_TECH_REQUEST,
  RETRIEVE_PROJECT_TECH_FAILURE
} from '../../../constants/projectsTypes';

describe('Fetch all project technologies action', () => {
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
  const baseURL = `${serverURL}/api/v2/projects/technologies`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the fetch all project technologies action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchAllProjectTechnologiesAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: RETRIEVE_PROJECT_TECH_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllProjectTechnologies()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates RETRIEVE_PROJECT_TECH_SUCCESS when the post request completes successfully', () => {
    testFetchAllProjectTechnologiesAction({
      type: RETRIEVE_PROJECT_TECH_SUCCESS,
      data: {}
    });
  });

  it('creates RETRIEVE_PROJECT_TECH_FAILURE when the GET request encounters an error', () => {
    testFetchAllProjectTechnologiesAction(
      {
        type: RETRIEVE_PROJECT_TECH_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
