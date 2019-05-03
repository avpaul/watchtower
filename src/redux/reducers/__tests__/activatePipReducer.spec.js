import activatePipReducer from '../activatePipReducer';
import * as types from '../../constants/pipActivationTypes';
import initialState from '../initialState';

describe('activate pip', () => {
  it('should return the initial state', () => {
    expect(activatePipReducer(undefined, {})).toEqual(initialState.pipData);
  });

  it('should handle activate pip request', () => {
    const newState = {
      data: {},
      loading: true,
      error: null
    };
    const action = { type: types.ACTIVATION_REQUEST };
    expect(activatePipReducer(initialState.pipData, action)).toEqual(newState);
  });

  it('should handle activate pip failure', () => {
    const error = 'there was an error processing request';
    const newState = {
      data: {},
      loading: false,
      error: 'there was an error processing request'
    };
    const action = { type: types.ACTIVATION_FAILURE, error };
    expect(activatePipReducer(initialState.pipData, action)).toEqual(newState);
  });

  it('should handle activate pip success', () => {
    const data = { status: 'success', message: 'pip feedback saved!' };
    const newState = {
      data: { status: 'success', message: 'pip feedback saved!' },
      loading: false,
      error: null
    };
    const action = { type: types.ACTIVATION_SUCCESS, data };
    expect(activatePipReducer(initialState.pipData, action)).toEqual(newState);
  });
});
