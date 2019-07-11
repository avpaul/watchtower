import cadreAddCertificationReducer from '../cadreAddCertificationReducer';
import * as types from '../../constants/cadreAddCertificationTypes';
import initialState from '../initialState';

describe('create role reducer', () => {
  it('should return the initial state', () => {
    expect(cadreAddCertificationReducer(undefined, {})).toEqual(
      initialState.createRole
    );
  });

  it('should handle create role request', () => {
    const newState = {
      data: [],
      loading: true,
      error: null
    };
    const action = { type: types.ADD_CERTIFICATION_REQUEST };
    expect(
      cadreAddCertificationReducer(initialState.createRole, action)
    ).toEqual(newState);
  });

  it('should handle create certification failure', () => {
    const error = 'there was an error processing request';
    const newState = {
      data: [],
      loading: false,
      error: 'there was an error processing request'
    };
    const action = { type: types.ADD_CERTIFICATION_FAILURE, error };
    expect(
      cadreAddCertificationReducer(initialState.createRole, action)
    ).toEqual(newState);
  });

  it('should handle create certification success', () => {
    const data = {
      name: 'success',
      description: 'role creation!',
      duration: 23,
      exclusive: false
    };
    const newState = {
      data,
      loading: false,
      error: null
    };
    const action = { type: types.ADD_CERTIFICATION_SUCCESS, data };
    expect(
      cadreAddCertificationReducer(initialState.createRole, action)
    ).toEqual(newState);
  });
});
