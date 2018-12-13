import initialState from './initialState';
import fellowNotificationReducer from './fellowNotificationReducer';
import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE
} from '../constants/fellowNotificationTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowNotificationReducer(undefined, {})).toEqual({
    loading: false,
    notification: {},
    error: ''
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    notification: {}
  };
  const action = { type: LOAD_NOTIFICATION_REQUEST };
  expect(fellowNotificationReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    notification: {}
  };
  const action = {
    type: LOAD_NOTIFICATION_SUCCESS,
    notification: {}
  };

  expect(fellowNotificationReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    notification: {}
  };
  const action = {
    type: LOAD_NOTIFICATION_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowNotificationReducer(undefined, action)).toMatchObject(newState);
});
