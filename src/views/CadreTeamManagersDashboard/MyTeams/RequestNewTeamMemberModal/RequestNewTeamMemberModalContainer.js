import { connect } from 'react-redux';
import RequestNewTeamMemberModal from './RequestNewTeamMemberModal';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';
import fetchTeamMembers from '../../../../redux/actionCreators/teamManagerActions';
import requestNewTeamMembers from '../../../../redux/actionCreators/cadreTeamManager/newTeamMemberRequestActions';

export const mapStateToProps = ({
  teamManagerTeamMembers,
  allRoles,
  newTeamMemberRequest
}) => ({
  allProjects: teamManagerTeamMembers,
  allProjectRoles: allRoles,
  newTeamMemberRequest
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects: fetchTeamMembers,
    fetchAllRoles,
    requestNewTeamMembers
  }
)(RequestNewTeamMemberModal);
