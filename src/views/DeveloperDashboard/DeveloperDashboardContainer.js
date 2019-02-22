import { connect } from 'react-redux';

import DeveloperDashboard from './DeveloperDashboard';
import getManagerFellowsSummary from '../../redux/actionCreators/ManagerFellowsSummaryActions';

export const mapStateToProps = ({ managerFellowsSummary }) => ({
  loading: managerFellowsSummary.loading,
  data: managerFellowsSummary.data,
  error: managerFellowsSummary.error
});

export default connect(
  mapStateToProps,
  { getManagerFellowsSummary }
)(DeveloperDashboard);
