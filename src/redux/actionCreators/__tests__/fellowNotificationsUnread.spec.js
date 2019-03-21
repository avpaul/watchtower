import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_UNREAD_NOTIFICATION_REQUEST,
  LOAD_UNREAD_NOTIFICATION_SUCCESS,
  LOAD_UNREAD_NOTIFICATION_FAILURE
} from '../../constants/fellowUnreadNotifications';
import getFellowUnreadNotification from '../fellowNotificationsUnread';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Fellow Notification Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v1/notifications?filter=unread`;
  const store = mockStore({
    loading: false,
    unreadnotification: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_UNREAD_NOTIFICATION_REQUEST and  LOAD_UNREAD_NOTIFICATION_FAILURE on failing to fetch fellow notification', () => {
    const expectedActions = [
      { type: LOAD_UNREAD_NOTIFICATION_REQUEST },
      {
        type: LOAD_UNREAD_NOTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store
      .dispatch(getFellowUnreadNotification({ email: '' }))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches LOAD_UNREAD_NOTIFICATION_REQUEST and  LOAD_UNREAD_NOTIFICATION_SUCCESS on failing to fetch fellow', () => {
    const data = {
      fellow: undefined
    };

    mock.onGet(`${url}`).reply(200, data);

    const expectedActions = [
      { type: LOAD_UNREAD_NOTIFICATION_REQUEST },
      {
        type: LOAD_UNREAD_NOTIFICATION_SUCCESS,
        ...data
      }
    ];
    return store.dispatch(getFellowUnreadNotification('trust')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
