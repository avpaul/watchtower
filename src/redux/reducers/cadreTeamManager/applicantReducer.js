import * as types from '../../constants/cadreTeamManager/applicationsTypes';
import initialState from '../initialState';
import genericReducer from '../genericReducer';

export const teamManagerProjectApplicantReducer = (
  state = initialState.teamManagerProjectApplicant,
  action
) =>
  genericReducer(
    [
      types.FETCH_SINGLE_APPLICATIONS_REQUEST,
      types.FETCH_SINGLE_APPLICATIONS_SUCCESS,
      types.FETCH_SINGLE_APPLICATIONS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
export default { teamManagerProjectApplicantReducer };
