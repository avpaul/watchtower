import { connect } from 'react-redux';
import EngineeringManagerDashboard from './EngineeringManagerDashboard';
import {
  fetchFellowsSummaryEm,
  fetchFellowsSummaryTTLLFAction
} from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';
import getEngineeringManagerTtls from '../../redux/actionCreators/getEngineeringManagerTtls';
import getSimulationsLeadLfs from '../../redux/actionCreators/simulationsLeadLfActions';

export const mapStateToProps = ({
  engineeringManagerTtls,
  emsDashboard,
  fellowsSummary,
  simulationsLeadLfs
}) => ({
  loading: engineeringManagerTtls.loading || simulationsLeadLfs.loading,
  data: engineeringManagerTtls.data,
  error: engineeringManagerTtls.error,
  fellowsSummaryEM: emsDashboard.fellowsSummary,
  fellowsSummaryTTL: fellowsSummary.fellowsSummaryTrend,
  simsLeadData: simulationsLeadLfs.data,
  simsLeadError: simulationsLeadLfs.error
});

export default connect(
  mapStateToProps,
  {
    fetchFellowsSummaryEm,
    fetchFellowsSummaryTTLLFAction,
    getEngineeringManagerTtls,
    getSimulationsLeadLfs
  }
)(EngineeringManagerDashboard);
