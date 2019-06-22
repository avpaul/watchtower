import { connect } from 'react-redux';
import CadreViewRoles from './CadreViewRoles';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';
import { getActiveRoleEngineer } from '../../../../redux/actionCreators/fellowActiveRoleActions';

export const mapStateToProps = ({ allRoles, fetchActiveRole }) => ({
  allRoles,
  loading: fetchActiveRole.loading,
  activeEngineers: fetchActiveRole.data
});

export default connect(
  mapStateToProps,
  {
    fetchAllRoles,
    getActiveRoleEngineer
  }
)(CadreViewRoles);
