import * as types from '../../constants/cadreEngineersTypes';
import cadreEngineersReducer from '../cadreEngineersReducer';
import initialState from '../initialState';

describe('fetch cadre engineers', () => {
  it('should return the initial state', () => {
    expect(cadreEngineersReducer(undefined, {})).toEqual(
      initialState.cadreEngineers
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
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
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
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });
  it('should update error if request fails', () => {
    const newState = {
      cadreEngineers: [],
      error: '',
      loading: true
    };

    const action = {
      type: types.FETCH_CADRE_REQUEST,
      error: 'Network error'
    };
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });
});
