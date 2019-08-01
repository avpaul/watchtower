import opsEditCertificationReducer from '../opsEditCertificationReducer';
import {
  EDIT_CERTIFICATION_SUCCESS,
  EDIT_CERTIFICATION_FAILURE,
  EDIT_CERTIFICATION_REQUEST
} from '../../constants/opsCertificationTypes';
import initialState from '../initialState';

describe('Ops edit certification reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(opsEditCertificationReducer(undefined, {})).toEqual({
      loading: false,
      data: initialState.editCertification.data,
      error: {}
    });
  });

  it('should set loading state on posting a new project', () => {
    const action = { type: EDIT_CERTIFICATION_REQUEST };
    expect(opsEditCertificationReducer(undefined, action)).toEqual({
      ...initialState.editCertification,
      loading: true
    });
  });

  it('should execute the success action type case on successful post', () => {
    const action = {
      type: EDIT_CERTIFICATION_SUCCESS,
      data: []
    };

    const newState = {
      ...initialState.editCertification,
      data: action.data,
      error: null
    };

    expect(opsEditCertificationReducer(undefined, action)).toEqual(newState);
  });

  it('should execute the failure action type case on failed post', () => {
    const action = {
      type: EDIT_CERTIFICATION_FAILURE,
      error: { message: 'error' }
    };

    const newState = {
      ...initialState.editCertification,
      error: action.error
    };

    expect(opsEditCertificationReducer(undefined, action)).toEqual(newState);
  });
});
