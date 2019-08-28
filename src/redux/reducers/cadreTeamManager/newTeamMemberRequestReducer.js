import initialState from '../initialState';
import * as types from '../../constants/cadreTeamManager/newTeamMemberTypes';
import genericReducer from '../genericReducer';

const newTeamMemberRequestReducer = (
  state = initialState.newTeamMemberRequest,
  action
) =>
  genericReducer(
    [
      types.NEW_TEAM_MEMBER_REQUEST_REQUEST,
      types.NEW_TEAM_MEMBER_REQUEST_SUCCESS,
      types.NEW_TEAM_MEMBER_REQUEST_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
export default newTeamMemberRequestReducer;
