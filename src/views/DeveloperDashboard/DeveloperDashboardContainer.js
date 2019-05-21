import { connect } from 'react-redux';

import ConnectedDeveloperDashboard from './DeveloperDashboard';
import getManagerFellowsSummary from '../../redux/actionCreators/managerFellowsSummaryActions';

export const mapStateToProps = ({ managerFellowsSummary }) => ({
  loading: managerFellowsSummary.loading,
  data: managerFellowsSummary.data,
  error: managerFellowsSummary.error
});

export default connect(
  mapStateToProps,
  { getManagerFellowsSummary }
)(ConnectedDeveloperDashboard);
