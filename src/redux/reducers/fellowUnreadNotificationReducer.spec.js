import initialState from './initialState';
import fellowUnreadNotificationReducer from './fellowUnreadNotificationReducer';
import {
  LOAD_UNREAD_NOTIFICATION_REQUEST,
  LOAD_UNREAD_NOTIFICATION_SUCCESS,
  LOAD_UNREAD_NOTIFICATION_FAILURE
} from '../constants/fellowUnreadNotifications';

it('should return the initial state for unknown action type', () => {
  expect(fellowUnreadNotificationReducer(undefined, {})).toEqual({
    loading: false,
    unreadnotification: {},
    error: ''
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    unreadnotification: {}
  };
  const action = { type: LOAD_UNREAD_NOTIFICATION_REQUEST };
  expect(fellowUnreadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    unreadnotification: {}
  };
  const action = {
    type: LOAD_UNREAD_NOTIFICATION_SUCCESS,
    unreadnotification: {}
  };

  expect(fellowUnreadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    unreadnotification: {}
  };
  const action = {
    type: LOAD_UNREAD_NOTIFICATION_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowUnreadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
});
