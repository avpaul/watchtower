import { connect } from 'react-redux';
import EngineeringManagerDashboard from './EngineeringManagerDashboard';
import getEngineeringManagerTtls from '../../redux/actionCreators/getEngineeringManagerTtls';
import getSimulationsLeadLfs from '../../redux/actionCreators/simulationsLeadLfActions';

export const mapStateToProps = ({
  engineeringManagerTtls,
  simulationsLeadLfs
}) => ({
  loading: engineeringManagerTtls.loading || simulationsLeadLfs.loading,
  data: engineeringManagerTtls.data,
  error: engineeringManagerTtls.error,
  simsLeadData: simulationsLeadLfs.data,
  simsLeadError: simulationsLeadLfs.error
});

export default connect(
  mapStateToProps,
  { getEngineeringManagerTtls, getSimulationsLeadLfs }
)(EngineeringManagerDashboard);
