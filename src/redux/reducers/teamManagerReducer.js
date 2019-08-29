import initialState from './initialState';
import * as types from '../constants/teamManagerActionTypes';
import genericReducer from './genericReducer';

const teamManagerTeamReducer = (
  state = initialState.teamManagerTeamMembers,
  action
) =>
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

export const rollOffTeamMemberReducer = (
  state = initialState.rollOffEngineerStatus,
  action
) =>
  genericReducer(
    [
      types.ROLL_OFF_TEAM_MEMBER_REQUEST,
      types.ROLL_OFF_TEAM_MEMBER_SUCCESS,
      types.ROLL_OFF_TEAM_MEMBER_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

const filterData = (data, projectId, fellowId) => {
  const filteredData = data;
  const targetProjectIndex = data[0].projects.findIndex(
    project => project.id === projectId
  );
  filteredData[0].projects[targetProjectIndex].engineers = data[0].projects[
    targetProjectIndex
  ].engineers.filter(engineer => engineer.fellow_id !== fellowId);
  return filteredData;
};

export const removeRolledOffEngineerCardReducer = reducer => (
  state = initialState.teamMembers,
  action
) => {
  if (action.type === types.REMOVE_ENGINEER_CARD) {
    return {
      ...state,
      data: filterData(state.data, action.projectId, action.fellowId)
    };
  }
  return reducer(state, action);
};

export default teamManagerTeamReducer;
