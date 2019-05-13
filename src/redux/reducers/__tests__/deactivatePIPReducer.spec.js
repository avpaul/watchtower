import deactivatePipReducer from '../pipDeactivationReducer';
import * as types from '../../constants/pipDeactivationTypes';
import initialState from '../initialState';

describe('deactivate pip', () => {
  it('should return the initial state', () => {
    expect(deactivatePipReducer(undefined, {})).toEqual(
      initialState.pipDeactivation
    );
  });

  it('should update state when pip is deactivated', () => {
    const newState = {
      success: true
    };
    const action = { type: types.DEACTIVATION_SUCCESS };
    expect(deactivatePipReducer(initialState.pipDeactivation, action)).toEqual(
      newState
    );
  });

  it('should update state when pip deactivation fails', () => {
    const newState = {
      success: false
    };
    const action = { type: types.DEACTIVATION_FAILURE };
    expect(deactivatePipReducer(initialState.pipDeactivation, action)).toEqual(
      newState
    );
  });
});
