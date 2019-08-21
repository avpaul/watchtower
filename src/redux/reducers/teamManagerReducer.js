import initialState from './initialState';
import * as types from '../constants/teamManagerActionTypes';
import genericReducer from './genericReducer';

const teamManagerTeamReducer = (state = initialState.teamMembers, action) =>
  genericReducer(
    [
      types.GET_TEAM_MEMBERS_REQUEST,
      types.GET_TEAM_MEMBERS_SUCCESS,
      types.GET_TEAM_MEMBERS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default teamManagerTeamReducer;
