import { connect } from 'react-redux';
import CadreViewRoles from './CadreViewRoles';
import {
  fetchAllRoles,
  setDeleteTarget
} from '../../../../redux/actionCreators/cadreProjectRoleActions';
import { fetchAllProjects } from '../../../../redux/actionCreators/projectsActions';
import { getActiveRoleEngineer } from '../../../../redux/actionCreators/fellowActiveRoleActions';

export const mapStateToProps = ({
  allRoles,
  fetchActiveRole,
  allProjects
}) => ({
  allRoles,
  allProjects: allProjects.data,
  loading: fetchActiveRole.loading,
  activeEngineers: fetchActiveRole.data
});

export default connect(
  mapStateToProps,
  {
    fetchAllRoles,
    fetchAllProjects,
    getActiveRoleEngineer,
    setDeleteTarget
  }
)(CadreViewRoles);
