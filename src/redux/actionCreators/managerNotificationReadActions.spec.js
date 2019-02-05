import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import updateManagerNotificationAsRead from './managerNotificationReadActions';
import * as types from '../constants/managerNotificationTypes';
import initialState from '../reducers/initialState';

describe('LF Notification Action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState.updateManagerNotification);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

  const url = `${serverURL}/api/v1/managers/notification/1/read`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatch LOAD_MANAGER_READ_NOTIFICATION_REQUEST and LOAD_MANAGER_READ_NOTIFICATION_SUCCESS on success', () => {
    const expectedActions = [
      { type: types.LOAD_MANAGER_READ_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
        updateManagerNotification: 'success'
      }
    ];

    mock.onPut(url).reply(200, 'success');
    return store.dispatch(updateManagerNotificationAsRead('1')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it('dispatch LOAD_MANAGER_READ_NOTIFICATION_REQUEST and LOAD_MANAGER_READ_NOTIFICATION_FAILURE on error', () => {
    const expectedActions = [
      { type: types.LOAD_MANAGER_READ_NOTIFICATION_REQUEST },
      {
        type: types.LOAD_MANAGER_READ_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];

    mock.onPut(url).reply(400, { error: 'error' });
    return store.dispatch(updateManagerNotificationAsRead('')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
