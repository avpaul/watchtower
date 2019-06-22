import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { getRoleSkills } from '../cadreProjectRoleActions';

import {
  FETCH_ROLE_SKILLS_REQUEST,
  FETCH_ROLE_SKILLS_SUCCESS,
  FETCH_ROLE_SKILLS_FAILURE
} from '../../constants/cadreProjectRolesTypes';

describe('Fetch all role skills', () => {
  const initialState = {
    roleSkills: {
      loading: false,
      data: {},
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/ops/roles/skills`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testFetchAllProjectTechnologiesAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: FETCH_ROLE_SKILLS_REQUEST },
      expectedResponse
    ];

    store.dispatch(getRoleSkills()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_ROLE_SKILLS_SUCCESS', () => {
    testFetchAllProjectTechnologiesAction({
      type: FETCH_ROLE_SKILLS_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_ROLE_SKILLS_FAILURE', () => {
    testFetchAllProjectTechnologiesAction(
      {
        type: FETCH_ROLE_SKILLS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
