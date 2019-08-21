import { connect } from 'react-redux';
import MyTeam from './MyTeams';

import fetchTeamMembers from '../../../redux/actionCreators/teamManagerActions';

export const mapStateToProps = ({ teamManagerTeamMembers }) => ({
  teamManagerTeamMembers
});

export default connect(
  mapStateToProps,
  {
    fetchTeamMembers
  }
)(MyTeam);
