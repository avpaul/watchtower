import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { rollOffAnEngineer } from '../teamManagerActions';

import {
  ROLL_OFF_TEAM_MEMBER_REQUEST,
  ROLL_OFF_TEAM_MEMBER_SUCCESS,
  ROLL_OFF_TEAM_MEMBER_FAILURE
} from '../../constants/teamManagerActionTypes';

describe('Role off engineer request', () => {
  const initialState = {
    rollOffEngineerStatus: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/manager/team/779454`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const rollOffRequest = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onPut(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: ROLL_OFF_TEAM_MEMBER_REQUEST },
      expectedResponse
    ];

    store.dispatch(rollOffAnEngineer(779454)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates ROLL_OFF_TEAM_MEMBER_SUCCESS', () => {
    rollOffRequest({
      type: ROLL_OFF_TEAM_MEMBER_SUCCESS,
      data: {}
    });
  });

  it('creates ROLL_OFF_TEAM_MEMBER_FAILURE', () => {
    rollOffRequest(
      {
        type: ROLL_OFF_TEAM_MEMBER_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
