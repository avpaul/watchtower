import lfNotificationReducer from './lfNotificationReducer';
import {
  LOAD_LF_NOTIFICATION_REQUEST,
  LOAD_LF_NOTIFICATION_SUCCESS,
  LOAD_LF_NOTIFICATION_FAILURE
} from '../constants/lfNotificationTypes';

describe('LF Notification Reducer', () => {
  it('should return intial state for unknown action type', () => {
    expect(lfNotificationReducer(undefined, {})).toEqual({
      loading: false,
      lfNotification: [],
      error: null
    });
  });

  it('should set loading state on fetching LF Notification', () => {
    const newState = {
      loading: true,
      error: null
    };
    const action = { type: LOAD_LF_NOTIFICATION_REQUEST };
    expect(lfNotificationReducer(undefined, action)).toMatchObject(newState);
  });

  it('should return success type after loading successfully', () => {
    const newState = {
      loading: false,
      error: null,
      lfNotification: []
    };
    const action = {
      type: LOAD_LF_NOTIFICATION_SUCCESS,
      lfNotification: []
    };
    expect(lfNotificationReducer(undefined, action)).toMatchObject(newState);
  });

  it('should return failure type on failure', () => {
    const newState = {
      loading: false,
      error: 'something'
    };
    const action = {
      type: LOAD_LF_NOTIFICATION_FAILURE,
      error: 'something'
    };
    expect(lfNotificationReducer(undefined, action)).toMatchObject(newState);
  });
});
