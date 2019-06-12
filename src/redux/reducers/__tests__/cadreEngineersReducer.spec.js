import cadreEngineersReducer from '../cadreEngineersReducer';
import * as types from '../../constants/cadreEngineersTypes';
import initialState from '../initialState';

describe('fetch cadre engineers', () => {
  it('should return the initial state', () => {
    expect(cadreEngineersReducer(undefined, {})).toEqual(
      initialState.d1Engineers
    );
  });

  it('should update state when request is successful', () => {
    const newState = {
      loading: false,
      cadreEngineers: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ],
      error: ''
    };
    const action = {
      type: types.FETCH_CADRE_SUCCESS,
      engineers: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ]
    };
    expect(cadreEngineersReducer(initialState.d1Engineers, action)).toEqual(
      newState
    );
  });

  it('should update error if request fails', () => {
    const newState = {
      loading: false,
      cadreEngineers: [],
      error: 'Network error'
    };

    const action = {
      type: types.FETCH_CADRE_FAILURE,
      error: 'Network error'
    };
    expect(cadreEngineersReducer(initialState.d1Engineers, action)).toEqual(
      newState
    );
  });
});
