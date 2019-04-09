import managerProfileReducer from '../managerProfileReducer';
import {
  MANAGER_PROFILE_DATA_REQUEST,
  MANAGER_PROFILE_DATA_SUCCESS,
  MANAGER_PROFILE_DATA_FAILURE
} from '../../constants/managerActionTypes';

it('should return the initial state for unknown action type', () => {
  expect(managerProfileReducer(undefined, {})).toEqual({
    loading: false,
    data: [],
    error: null
  });
});

it('should set loading state on fetching profile data', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: MANAGER_PROFILE_DATA_REQUEST };
  expect(managerProfileReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched profile data to state', () => {
  const newState = {
    loading: false,
    data: [],
    error: null
  };
  const action = {
    type: MANAGER_PROFILE_DATA_SUCCESS,
    data: [],
    error: null
  };

  expect(managerProfileReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch manager profile data', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    data: []
  };
  const action = {
    type: MANAGER_PROFILE_DATA_FAILURE,
    error: { message: 'error' }
  };

  expect(managerProfileReducer(undefined, action)).toMatchObject(newState);
});
