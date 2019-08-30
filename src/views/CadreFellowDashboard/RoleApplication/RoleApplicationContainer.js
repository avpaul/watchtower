import { connect } from 'react-redux';
import RoleApplication from './RoleApplication';
import applyForRole from '../../../redux/actionCreators/applyForRoleActions';

const mapStateToProps = ({ cadreVacancies }) => ({
  applications: cadreVacancies
});

export default connect(
  mapStateToProps,
  {
    applyForRole
  }
)(RoleApplication);
