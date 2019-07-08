import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { fetchAllRoles } from '../cadreProjectRoleActions';

import * as types from '../../constants/cadreProjectRolesTypes';

describe('Fetch all roles action', () => {
  const initialState = {
    fetchAllRoles: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/roles`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the fetch all roles action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchAllRolesAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_PROJECT_ROLES_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllRoles()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_PROJECT_ROLES_SUCCESS when the get request completes successfully', () => {
    testFetchAllRolesAction({
      type: types.FETCH_PROJECT_ROLES_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_PROJECT_ROLES_FAILURE when the GET request encounters an error', () => {
    testFetchAllRolesAction(
      {
        type: types.FETCH_PROJECT_ROLES_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
