import { connect } from 'react-redux';
import EngineeringManagerDashboard from './EngineeringManagerDashboard';
import getEngineeringManagerTtls from '../../redux/actionCreators/getEngineeringManagerTtls';

export const mapStateToProps = ({ engineeringManagerTtls }) => ({
  loading: engineeringManagerTtls.loading,
  data: engineeringManagerTtls.data,
  error: engineeringManagerTtls.error
});

export default connect(
  mapStateToProps,
  { getEngineeringManagerTtls }
)(EngineeringManagerDashboard);
