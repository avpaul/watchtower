import { connect } from 'react-redux';
import CadreViewRoles from './CadreViewRoles';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = ({ allRoles }) => ({
  allRoles
});

export default connect(
  mapStateToProps,
  {
    fetchAllRoles
  }
)(CadreViewRoles);
