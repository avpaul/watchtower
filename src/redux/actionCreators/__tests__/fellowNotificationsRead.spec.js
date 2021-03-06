import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_READ_NOTIFICATION_REQUEST,
  LOAD_READ_NOTIFICATION_SUCCESS,
  LOAD_READ_NOTIFICATION_FAILURE
} from '../../constants/fellowReadNotifications';
import getFellowReadNotification from '../markNotificationsAsRead';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Fellow Notifications Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v2/notifications/read/all`;
  const store = mockStore({
    loading: false,
    readnotification: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_READ_NOTIFICATION_REQUEST and  LOAD_READ_NOTIFICATION_ERROR on failing to fetch fellow', () => {
    const expectedActions = [
      { type: LOAD_READ_NOTIFICATION_REQUEST },
      {
        type: LOAD_READ_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowReadNotification({ email: '' })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches LOAD_READ_NOTIFICATION_REQUEST and  LOAD_READ_NOTIFICATION_SUCCESS on failing to fetch fellow', () => {
    const data = {
      readnotification: undefined
    };

    mock.onPut(`${url}`).reply(200, data);

    const expectedActions = [
      { type: LOAD_READ_NOTIFICATION_REQUEST },
      {
        type: LOAD_READ_NOTIFICATION_SUCCESS,
        ...data
      }
    ];
    return store.dispatch(getFellowReadNotification('all')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
