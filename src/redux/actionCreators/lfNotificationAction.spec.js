import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import lfNotificationAction from './lfNotificationAction';
import * as types from '../constants/lfNotificationTypes';
import initialState from '../reducers/initialState';

describe('LF Notification Action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState.lfNotification);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

  const url = `${serverURL}/api/v1/managers/notification?email=test@andela.com`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatch LOAD_LF_NOTIFICATION_REQUEST and LOAD_LF_NOTIFICATION_SUCCESS on success', () => {
    const email = 'test@andela.com';
    const expectedActions = [
      { type: types.LOAD_LF_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_LF_NOTIFICATION_SUCCESS,
        lfNotification: 'success'
      }
    ];

    mock.onGet(url).reply(200, { data: 'success' });
    return store.dispatch(lfNotificationAction(email)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it('dispatch LOAD_LF_NOTIFICATION_REQUEST and LOAD_LF_NOTIFICATION_FAILURE on error', () => {
    const expectedActions = [
      { type: types.LOAD_LF_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_LF_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];

    mock.onGet(url).reply(400, { error: 'error' });
    return store.dispatch(lfNotificationAction('')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
