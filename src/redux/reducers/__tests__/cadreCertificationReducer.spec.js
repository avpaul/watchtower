import initialState from '../initialState';
import cadreCertificationReducer from '../cadreCertificationReducer';
import {
  FETCH_CERTIFICATION_REQUEST,
  FETCH_CERTIFICATION_SUCCESS,
  FETCH_CERTIFICATION_FAILURE,
  REMOVE_CERTIFICATION_ON_FOCUS
} from '../../constants/cadreCertificationTypes';

it('should return the initial state for unknown action type', () => {
  expect(cadreCertificationReducer(undefined, {})).toEqual({
    loading: false,
    data: [],
    error: null
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: FETCH_CERTIFICATION_REQUEST };
  expect(cadreCertificationReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    error: null,
    data: []
  };
  const action = {
    type: FETCH_CERTIFICATION_SUCCESS,
    data: []
  };

  expect(cadreCertificationReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    data: []
  };
  const action = {
    type: FETCH_CERTIFICATION_FAILURE,
    error: { message: 'error' }
  };

  expect(cadreCertificationReducer(undefined, action)).toMatchObject(newState);
});

it('should remove certification when delete certification is successful', () => {
  const newState = {
    loading: false,
    error: null,
    data: []
  };
  const action = {
    type: REMOVE_CERTIFICATION_ON_FOCUS,
    error: { message: 'error' }
  };

  expect(cadreCertificationReducer(undefined, action)).toMatchObject(newState);
});
