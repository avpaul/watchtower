import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  getFellowRoleActiveRequest,
  getFellowRoleActiveSuccess,
  getFellowRoleActiveFailure,
  getActiveRoleEngineer
} from '../fellowActiveRoleActions';
import {
  FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
  FETCH_ROLE_ACTIVE_ENGINEER_REQUEST,
  FETCH_ROLE_ACTIVE_ENGINEER_FAILURE
} from '../../constants/fellowActiveRolesTypes';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('should fetch role active engineers', () => {
  let mock;
  let store;
  let url;
  let roleId;
  const errorMessage = 'Request failed with status code 404';
  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    roleId = '1';
    url = `${serverUrl}/api/v2/ops/roles/${roleId}`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to role active engineers', () => {
    const expectedAction = {
      type: FETCH_ROLE_ACTIVE_ENGINEER_REQUEST
    };
    expect(getFellowRoleActiveRequest()).toEqual(expectedAction);
  });

  it('should role active engineers without data', () => {
    const expectedAction = {
      data: [],
      type: FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS
    };
    expect(getFellowRoleActiveSuccess()).toEqual(expectedAction);
  });

  it('should role active engineers with data', () => {
    const expectedAction = {
      data: [],
      type: FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS
    };
    expect(getFellowRoleActiveSuccess([])).toEqual(expectedAction);
  });

  it('should role active engineers failure', () => {
    const expectedAction = {
      type: FETCH_ROLE_ACTIVE_ENGINEER_FAILURE,
      error: errorMessage
    };
    expect(
      getFellowRoleActiveFailure({
        message: errorMessage
      })
    ).toEqual(expectedAction);
  });

  it('should fetch active engineers', done => {
    mock.onGet(url).reply(200, []);
    const expectedAction = [
      {
        type: FETCH_ROLE_ACTIVE_ENGINEER_REQUEST
      },
      {
        type: FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
        data: []
      }
    ];
    store
      .dispatch(getActiveRoleEngineer(roleId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should try to fetch active engineers and fail', done => {
    mock.onGet(url).reply(404);
    const expectedAction = [
      {
        type: FETCH_ROLE_ACTIVE_ENGINEER_REQUEST
      },
      {
        type: FETCH_ROLE_ACTIVE_ENGINEER_FAILURE,
        error: errorMessage
      }
    ];
    store
      .dispatch(getActiveRoleEngineer())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});
