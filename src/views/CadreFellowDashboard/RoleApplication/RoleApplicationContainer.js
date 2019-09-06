import { connect } from 'react-redux';
import RoleApplication from './RoleApplication';
import applyForRole from '../../../redux/actionCreators/applyForRoleActions';

const mapStateToProps = ({ cadreVacancies }) => ({
  loading: cadreVacancies.loading,
  error: cadreVacancies.error,
  newApplication: cadreVacancies.data.newApplication
});

export default connect(
  mapStateToProps,
  {
    applyForRole
  }
)(RoleApplication);
