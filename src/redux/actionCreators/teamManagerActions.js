import { genericAPIGetRequest, genericAPIPutRequest } from './helpers';
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

/**
 * An action creator responsible for removing engineer info from the store after he/she is rolled off
 */
export const removeRolledOffEngineerCard = (dispatch, response) =>
  dispatch({
    type: types.REMOVE_ENGINEER_CARD,
    fellowId: response.data.fellow_id,
    projectId: response.data.project_id
  });

/**
 * An action creator responsible for rolling off an engineer from a team managers team
 * @return object An instance of a Promise
 */
export const rollOffAnEngineer = fellowId =>
  genericAPIPutRequest(
    `projects/manager/team/${fellowId}`,
    [
      types.ROLL_OFF_TEAM_MEMBER_REQUEST,
      types.ROLL_OFF_TEAM_MEMBER_SUCCESS,
      types.ROLL_OFF_TEAM_MEMBER_FAILURE
    ],
    {},
    removeRolledOffEngineerCard
  );
export default fetchTeamMembers;
