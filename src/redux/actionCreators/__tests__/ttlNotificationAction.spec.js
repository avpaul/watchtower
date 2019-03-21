import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ttlNotificationAction from '../ttlNotificationActions';
import * as types from '../../constants/ttlNotificationTypes';
import initialState from '../../reducers/initialState';

describe('LF Notification Action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState.ttlNotification);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

  const url = `${serverURL}/api/v1/managers/notification?email=test@andela.com`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatch LOAD_TTL_NOTIFICATION_REQUEST and LOAD_TTL_NOTIFICATION_SUCCESS on success', () => {
    const email = 'test@andela.com';
    const expectedActions = [
      { type: types.LOAD_TTL_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_TTL_NOTIFICATION_SUCCESS,
        ttlNotification: 'success'
      }
    ];

    mock.onGet(url).reply(200, { data: 'success' });
    return store.dispatch(ttlNotificationAction(email)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it('dispatch LOAD_TTL_NOTIFICATION_REQUEST and LOAD_TTL_NOTIFICATION_FAILURE on error', () => {
    const expectedActions = [
      { type: types.LOAD_TTL_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_TTL_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];

    mock.onGet(url).reply(400, { error: 'error' });
    return store.dispatch(ttlNotificationAction('')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
