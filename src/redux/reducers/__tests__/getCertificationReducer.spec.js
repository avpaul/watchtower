import getCertificationReducer from '../getCertificationReducer';
import initialState from '../initialState';
import {
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAILURE
} from '../../constants/certificationTypes';

describe('Get certication reducer', () => {
  it('should handle initial state', () => {
    expect(getCertificationReducer(undefined, {})).toEqual(
      initialState.getCertification
    );
  });
  it('should handle get certification request', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: GET_CERTIFICATION_REQUEST
      })
    ).toEqual({ data: {}, error: {}, loading: true });
  });
  it('should handle get certification success', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: GET_CERTIFICATION_SUCCESS,
        data: { name: 'testing' }
      })
    ).toEqual({ data: { name: 'testing' }, error: null, loading: false });
  });
  it('should handle get certification failure', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: GET_CERTIFICATION_FAILURE,
        error: { error: 'testing' }
      })
    ).toEqual({ error: { error: 'testing' }, data: {}, loading: false });
  });
});
