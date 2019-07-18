import deleteCertificationReducer from '../deleteCertificationReducer';
import {
  DELETE_CERTIFICATION_REQUEST,
  DELETE_CERTIFICATION_SUCCESS,
  DELETE_CERTIFICATION_FAILURE
} from '../../constants/cadreCertificationTypes';
import initialState from '../initialState';

describe('Delete Certification reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(deleteCertificationReducer(undefined, {})).toEqual(
      initialState.deleteCertification
    );
  });

  it('should set loading state on deleting Certification', () => {
    const action = { type: DELETE_CERTIFICATION_REQUEST };
    expect(deleteCertificationReducer(undefined, action)).toMatchObject({
      ...initialState.deleteCertification,
      loading: true
    });
  });

  it('should be able to add success message to state', () => {
    const action = {
      type: DELETE_CERTIFICATION_SUCCESS,
      data: { message: 'Success!' }
    };

    expect(deleteCertificationReducer(undefined, action)).toMatchObject({
      ...initialState.deleteCertification,
      data: action.data
    });
  });

  it('should add the error message on failing to delete Certification', () => {
    const action = {
      type: DELETE_CERTIFICATION_FAILURE,
      error: { message: 'error' }
    };

    expect(deleteCertificationReducer(undefined, action)).toMatchObject({
      ...initialState.deleteCertification,
      error: action.error
    });
  });
});
