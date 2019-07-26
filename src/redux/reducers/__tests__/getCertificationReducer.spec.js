import * as types from '../../constants/cadreCertificationTypes';
import getCertificationReducer from '../getCertificationReducer';
import initialState from '../initialState';

describe('Get certication reducer', () => {
  it('should handle initial state', () => {
    expect(getCertificationReducer(undefined, {})).toEqual(
      initialState.getCertification
    );
  });
  it('should handle get certification request', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: types.GET_CERTIFICATION_REQUEST
      })
    ).toEqual({ data: {}, error: {}, loading: true });
  });
  it('should handle get certification success', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: types.GET_CERTIFICATION_SUCCESS,
        data: { name: 'testing' }
      })
    ).toEqual({ data: { name: 'testing' }, error: null, loading: false });
  });
  it('should handle get certification failure', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: types.GET_CERTIFICATION_FAILURE,
        error: { error: 'testing' }
      })
    ).toEqual({ error: { error: 'testing' }, data: {}, loading: false });
  });
});

describe('Certification Application', () => {
  it('should handle certification application request', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: types.CERTIFICATION_APPLICATION_REQUEST
      })
    ).toEqual({ data: {}, error: {}, loading: true });
  });

  it('should handle certification application success', () => {
    const responseBody = {
      projectCertificationsId: 14,
      fellowId: 21,
      updatedAt: '2019-07-10 20:04:22',
      createdAt: '2019-07-10 20:04:22',
      id: 2
    };
    const currentState = {
      loading: false,
      data: {
        applications: []
      },
      error: null
    };

    expect(
      getCertificationReducer(currentState, {
        type: types.CERTIFICATION_APPLICATION_SUCCESS,
        data: { ...responseBody }
      })
    ).toEqual({
      loading: false,
      error: null,
      data: {
        applications: [
          {
            createdAt: '2019-07-10 20:04:22',
            fellowId: 21,
            id: 2,
            projectCertificationsId: 14,
            updatedAt: '2019-07-10 20:04:22'
          }
        ]
      }
    });
  });
  it('should handle get certification failure', () => {
    expect(
      getCertificationReducer(initialState.getCertification, {
        type: types.GET_CERTIFICATION_FAILURE,
        error: { error: 'testing' }
      })
    ).toEqual({ error: { error: 'testing' }, data: {}, loading: false });
  });
});
