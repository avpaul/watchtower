import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { createNewRole } from '../cadreProjectRoleActions';

import * as types from '../../constants/cadreProjectRolesTypes';

describe('create roles action', () => {
  const initialState = {
    createRole: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/ops/roles`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testCreateRolesAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }],
    data = {}
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.CREATE_PROJECT_ROLE_REQUEST },
      expectedResponse
    ];

    return store.dispatch(createNewRole(data)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('CREATE_PROJECT_ROLE_SUCCESS', () => {
    testCreateRolesAction({
      type: types.CREATE_PROJECT_ROLE_SUCCESS,
      data: {}
    });
  });

  it('CREATE_PROJECT_ROLE_FAILURE', () => {
    testCreateRolesAction(
      {
        type: types.CREATE_PROJECT_ROLE_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
