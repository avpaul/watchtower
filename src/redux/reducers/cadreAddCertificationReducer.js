import initialState from './initialState';
import * as types from '../constants/cadreAddCertificationTypes';
import genericReducer from './genericReducer';

const cadreAddCertificationReducer = (
  state = initialState.certifications,
  action
) =>
  genericReducer(
    [
      types.ADD_CERTIFICATION_REQUEST,
      types.ADD_CERTIFICATION_SUCCESS,
      types.ADD_CERTIFICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
export default cadreAddCertificationReducer;
