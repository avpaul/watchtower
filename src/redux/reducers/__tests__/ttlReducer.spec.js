import ttlReducer from '../ttlReducer';
import {
  LOAD_TTLS_REQUEST,
  LOAD_TTLS_SUCCESS,
  LOAD_TTLS_FAILURE
} from '../../constants/ttlTypes';

it('should return the initial state for unknown action type', () => {
  expect(ttlReducer(undefined, {})).toEqual({
    loading: false,
    ttls: [],
    error: null
  });
});

it('should set loading state on fetching ttls data', () => {
  const newState = {
    loading: true,
    ttls: [],
    error: null
  };
  const action = { type: LOAD_TTLS_REQUEST };
  expect(ttlReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched ttls to state', () => {
  const newState = {
    loading: false,
    ttls: [],
    error: null
  };
  const action = {
    type: LOAD_TTLS_SUCCESS,
    ttls: [],
    error: null
  };

  expect(ttlReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch ttls', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    ttls: []
  };
  const action = {
    type: LOAD_TTLS_FAILURE,
    error: { message: 'error' }
  };

  expect(ttlReducer(undefined, action)).toMatchObject(newState);
});
