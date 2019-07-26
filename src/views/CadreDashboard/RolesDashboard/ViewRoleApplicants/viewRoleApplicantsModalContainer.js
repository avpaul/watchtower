import { connect } from 'react-redux';
import ViewRoleApplicants from './viewRoleApplicantsModal';
import { getARole } from '../../../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = ({ singleRole }) => ({
  loading: singleRole.loading,
  data: singleRole.data
});

export default connect(
  mapStateToProps,
  {
    getARole
  }
)(ViewRoleApplicants);
