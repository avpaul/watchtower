import managerNotificationReducer from './managerNotificationReducer';
import {
  LOAD_MANAGER_READ_NOTIFICATION_REQUEST,
  LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
  LOAD_MANAGER_READ_NOTIFICATION_FAILURE
} from '../constants/managerNotificationTypes';

describe('Manager Notification Reducer', () => {
  it('should return intial state for unknown action type', () => {
    expect(managerNotificationReducer(undefined, {})).toEqual({
      loading: false,
      managerNotification: [],
      error: null
    });
  });

  it('should set loading state on fetching Manager Notification', () => {
    const newState = {
      loading: true,
      error: null,
      managerNotification: []
    };
    const action = { type: LOAD_MANAGER_READ_NOTIFICATION_REQUEST };
    expect(managerNotificationReducer(undefined, action)).toMatchObject(
      newState
    );
  });

  it('should return success type after loading successfully', () => {
    const newState = {
      loading: false,
      error: null,
      managerNotification: []
    };
    const action = {
      type: LOAD_MANAGER_READ_NOTIFICATION_SUCCESS,
      updateManagerNotification: []
    };
    expect(managerNotificationReducer(undefined, action)).toMatchObject(
      newState
    );
  });

  it('should return failure type on failure', () => {
    const newState = {
      loading: false,
      error: 'something',
      managerNotification: null
    };
    const action = {
      type: LOAD_MANAGER_READ_NOTIFICATION_FAILURE,
      error: 'something',
      managerNotification: null
    };
    expect(managerNotificationReducer(undefined, action)).toMatchObject(
      newState
    );
  });
});
