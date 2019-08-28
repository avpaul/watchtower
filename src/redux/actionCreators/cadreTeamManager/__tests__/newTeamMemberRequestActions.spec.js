import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import requestNewTeamMembers from '../newTeamMemberRequestActions';
import initialState from '../../../reducers/initialState';

import * as types from '../../../constants/cadreTeamManager/newTeamMemberTypes';

describe('Request new Team Members action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/manager/team`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testRequestNewTeamMembersAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Request sent successfully.' }]
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.NEW_TEAM_MEMBER_REQUEST_REQUEST },
      expectedResponse
    ];

    store.dispatch(requestNewTeamMembers({})).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates NEW_TEAM_MEMBER_REQUEST_SUCCESS when the post request completes successfully', () => {
    testRequestNewTeamMembersAction({
      type: types.NEW_TEAM_MEMBER_REQUEST_SUCCESS,
      data: {}
    });
  });

  it('creates NEW_TEAM_MEMBER_REQUEST_FAILURE when the post request encounters an error', () => {
    testRequestNewTeamMembersAction(
      {
        type: types.NEW_TEAM_MEMBER_REQUEST_FAILURE,
        error: 'there was a problem sending request'
      },
      [422, { message: 'there was a problem sending request' }]
    );
  });
});
