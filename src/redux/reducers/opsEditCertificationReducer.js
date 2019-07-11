import initialState from './initialState';
import {
  EDIT_CERTIFICATION_SUCCESS,
  EDIT_CERTIFICATION_FAILURE,
  EDIT_CERTIFICATION_REQUEST
} from '../constants/opsCertificationTypes';

import genericReducer from './genericReducer';

const opsEditCertificationReducer = (
  state = initialState.editCertification,
  action
) =>
  genericReducer(
    [
      EDIT_CERTIFICATION_REQUEST,
      EDIT_CERTIFICATION_SUCCESS,
      EDIT_CERTIFICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default opsEditCertificationReducer;
