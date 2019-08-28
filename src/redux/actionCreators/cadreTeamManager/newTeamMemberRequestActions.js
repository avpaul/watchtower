import * as types from '../../constants/cadreTeamManager/newTeamMemberTypes';
import { genericAPIPostRequest } from '../helpers';

const requestNewTeamMembers = data =>
  genericAPIPostRequest(
    'projects/manager/team',
    [
      types.NEW_TEAM_MEMBER_REQUEST_REQUEST,
      types.NEW_TEAM_MEMBER_REQUEST_SUCCESS,
      types.NEW_TEAM_MEMBER_REQUEST_FAILURE
    ],
    data
  );

export default requestNewTeamMembers;
