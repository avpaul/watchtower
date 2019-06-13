import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as types from '../../../constants/projectsTypes';
import { fetchAllProjects } from '../../projectsActions';

describe('Fetch all projects action', () => {
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
  const baseURL = `${serverURL}/api/v2/ops/projects`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the fetch all projects action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchAllProjectsAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_PROJECTS_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllProjects()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_PROJECTS_SUCCESS when the get request completes successfully', () => {
    testFetchAllProjectsAction({
      type: types.FETCH_PROJECTS_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_PROJECTS_FAILURE when the GET request encounters an error', () => {
    testFetchAllProjectsAction(
      {
        type: types.FETCH_PROJECTS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
