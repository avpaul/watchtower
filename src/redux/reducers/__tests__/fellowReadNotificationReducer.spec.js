import initialState from '../initialState';
import fellowReadNotificationReducer from '../fellowReadNotificationReducer';
import {
  LOAD_READ_NOTIFICATION_REQUEST,
  LOAD_READ_NOTIFICATION_SUCCESS,
  LOAD_READ_NOTIFICATION_FAILURE
} from '../../constants/fellowReadNotifications';

it('should return the initial state for unknown action type', () => {
  expect(fellowReadNotificationReducer(undefined, {})).toEqual({
    loading: false,
    readnotification: {},
    error: ''
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    readnotification: {}
  };
  const action = { type: LOAD_READ_NOTIFICATION_REQUEST };
  expect(fellowReadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    readnotification: {}
  };
  const action = {
    type: LOAD_READ_NOTIFICATION_SUCCESS,
    readnotification: {}
  };

  expect(fellowReadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    readnotification: {}
  };
  const action = {
    type: LOAD_READ_NOTIFICATION_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowReadNotificationReducer(undefined, action)).toMatchObject(
    newState
  );
});
