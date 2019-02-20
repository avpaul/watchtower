import { connect } from 'react-redux';
import EngineeringManagerDashboard from './EngineeringManagerDashboard';
import {
  fetchFellowsSummaryEm,
  fetchFellowsSummarySl,
  fetchFellowsSummaryLf,
  fetchFellowsSummaryTtl
} from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';
import getEngineeringManagerTtls from '../../redux/actionCreators/getEngineeringManagerTtls';
import getSimulationsLeadLfs from '../../redux/actionCreators/simulationsLeadLfActions';

export const mapStateToProps = ({
  engineeringManagerTtls,
  emsDashboard,
  simulationsLeadLfs
}) => ({
  loading: engineeringManagerTtls.loading || simulationsLeadLfs.loading,
  data: engineeringManagerTtls.data,
  error: engineeringManagerTtls.error,
  fellowsSummary: emsDashboard.fellowsSummary,
  simsLeadData: simulationsLeadLfs.data,
  simsLeadError: simulationsLeadLfs.error
});

export default connect(
  mapStateToProps,
  {
    fetchFellowsSummaryEm,
    getEngineeringManagerTtls,
    getSimulationsLeadLfs,
    fetchFellowsSummarySl,
    fetchFellowsSummaryLf,
    fetchFellowsSummaryTtl
  }
)(EngineeringManagerDashboard);
