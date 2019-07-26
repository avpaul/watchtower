import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  fetchAllRoles,
  deleteRoleRequest,
  getARole
} from '../cadreProjectRoleActions';

import * as types from '../../constants/cadreProjectRolesTypes';

describe('Fetch all roles action', () => {
  const initialState = {
    fetchAllRoles: {
      loading: false,
      data: [],
      error: null
    },
    allRoles: {
      deleteTarget: 1
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/roles`;

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    mock.reset();
    moxios.uninstall();
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

  it('creates DELETE_PROJECT_ROLE when the DELETE role request completes successfully', async done => {
    moxios.stubRequest(`${baseURL}/1`, {
      status: 204,
      response: {}
    });

    const expectedActions = [
      {
        type: types.DELETE_PROJECT_ROLE,
        data: { role: 1 }
      }
    ];

    await store.dispatch(deleteRoleRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('creates DELETE_PROJECT_ROLE_FAILURE when the DELETE role request fails', async done => {
    moxios.stubRequest(`${baseURL}/1`, {
      status: 404,
      response: {
        message: 'some cool error message'
      }
    });

    const expectedActions = [
      {
        type: types.DELETE_PROJECT_ROLE_FAILURE,
        error: 'some cool error message'
      }
    ];

    await store.dispatch(deleteRoleRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Fetch a role action', () => {
  const initialState = {
    getARole: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/roles/1`;

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    mock.reset();
    moxios.uninstall();
  });

  /**
   * Test the fetch a role action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchARoleAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_SINGLE_ROLE_REQUEST },
      expectedResponse
    ];

    store.dispatch(getARole()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_SINGLE_ROLE_SUCCESS when the get request completes successfully', () => {
    testFetchARoleAction({
      type: types.FETCH_PROJECT_ROLES_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_SINGLE_ROLE_FAILURE when the GET request encounters an error', () => {
    testFetchARoleAction(
      {
        type: types.FETCH_SINGLE_ROLE_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
