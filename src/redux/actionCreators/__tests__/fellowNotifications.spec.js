import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE
} from '../../constants/fellowNotificationTypes';
import getFellowNotification from '../fellowNotifications';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Fellow Notification Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v1/notifications`;
  const store = mockStore({
    loading: false,
    notification: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_NOTIFICATION_REQUEST and  LOAD_NOTIFICATION_FAILURE on failing to fetch fellow notification', () => {
    const expectedActions = [
      { type: LOAD_NOTIFICATION_REQUEST },
      {
        type: LOAD_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowNotification({ email: '' })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches LOAD_NOTIFICATION_REQUEST and  LOAD_NOTIFICATION_SUCCESS on failing to fetch fellow', () => {
    const data = {
      fellow: undefined
    };

    mock.onGet(`${url}`).reply(200, data);

    const expectedActions = [
      { type: LOAD_NOTIFICATION_REQUEST },
      {
        type: LOAD_NOTIFICATION_SUCCESS,
        ...data
      }
    ];
    return store.dispatch(getFellowNotification('trust')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
