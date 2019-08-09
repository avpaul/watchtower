import * as types from '../../constants/cadreTeamManager/applicationsTypes';
import initialState from '../initialState';
import genericReducer from '../genericReducer';

export const teamManagerProjectApplicationsReducer = (
  state = initialState.teamManagerProjectApplications,
  action
) =>
  genericReducer(
    [
      types.FETCH_APPLICATIONS_REQUEST,
      types.FETCH_APPLICATIONS_SUCCESS,
      types.FETCH_APPLICATIONS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default {
  teamManagerProjectApplicationsReducer
};
