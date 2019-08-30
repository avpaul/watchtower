import teamManagerTeamReducer, {
  rollOffTeamMemberReducer,
  removeRolledOffEngineerCardReducer
} from '../teamManagerReducer';
import initialState from '../initialState';
import managerTeamData from '../../../__mocks__/managerTeamData';

describe('get role skills', () => {
  const reducer = removeRolledOffEngineerCardReducer(teamManagerTeamReducer);
  it('should return the initial state', () => {
    expect(teamManagerTeamReducer(undefined, {})).toEqual(
      initialState.teamManagerTeamMembers
    );
  });

  it('should return the initial state', () => {
    expect(rollOffTeamMemberReducer(undefined, {})).toEqual(
      initialState.rollOffEngineerStatus
    );
  });

  it('should pass team data to removeRolledOffEngineerCardReducer reducer', () => {
    const teamData = {
      ...initialState.teamManagerTeamMembers,
      data: managerTeamData.data
    };

    expect(
      reducer(teamData, {
        type: 'REMOVE_ENGINEER_CARD',
        projectId: 24,
        fellowId: 1
      })
    ).toMatchObject({
      data: managerTeamData.data
    });
  });
});
