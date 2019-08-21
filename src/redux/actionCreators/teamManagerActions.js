import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/teamManagerActionTypes';

/**
 * An action creator responsible for fetching team manager team members
 * @return object An instance of a Promise
 */
const fetchTeamMembers = () =>
  genericAPIGetRequest('projects/manager/team', [
    types.GET_TEAM_MEMBERS_REQUEST,
    types.GET_TEAM_MEMBERS_SUCCESS,
    types.GET_TEAM_MEMBERS_FAILURE
  ]);

export default fetchTeamMembers;
