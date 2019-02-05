import ttlNotificationReducer from './ttlNotificationReducer';
import {
  LOAD_TTL_NOTIFICATION_REQUEST,
  LOAD_TTL_NOTIFICATION_SUCCESS,
  LOAD_TTL_NOTIFICATION_FAILURE
} from '../constants/ttlNotificationTypes';

describe('TTL Notification Reducer', () => {
  it('should return intial state for unknown action type', () => {
    expect(ttlNotificationReducer(undefined, {})).toEqual({
      loading: false,
      ttlNotification: [],
      error: null
    });
  });

  it('should set loading state on fetching TTL Notification', () => {
    const newState = {
      loading: true,
      error: null,
      ttlNotification: []
    };
    const action = { type: LOAD_TTL_NOTIFICATION_REQUEST };
    expect(ttlNotificationReducer(undefined, action)).toMatchObject(newState);
  });

  it('should return success type after loading successfully', () => {
    const newState = {
      loading: false,
      error: null,
      ttlNotification: []
    };
    const action = {
      type: LOAD_TTL_NOTIFICATION_SUCCESS,
      ttlNotification: []
    };
    expect(ttlNotificationReducer(undefined, action)).toMatchObject(newState);
  });

  it('should return failure type on failure', () => {
    const newState = {
      loading: false,
      error: 'something',
      ttlNotification: []
    };
    const action = {
      type: LOAD_TTL_NOTIFICATION_FAILURE,
      error: 'something'
    };
    expect(ttlNotificationReducer(undefined, action)).toMatchObject(newState);
  });
});
