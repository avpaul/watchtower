import { connect } from 'react-redux';
import MyTeam from './MyTeams';

import fetchTeamMembers, {
  rollOffAnEngineer
} from '../../../redux/actionCreators/teamManagerActions';

export const mapStateToProps = ({
  teamManagerTeamMembers,
  rollOffEngineerStatus
}) => ({
  teamManagerTeamMembers,
  rollOffEngineerStatus
});

export default connect(
  mapStateToProps,
  {
    fetchTeamMembers,
    rollOffAnEngineer
  }
)(MyTeam);
