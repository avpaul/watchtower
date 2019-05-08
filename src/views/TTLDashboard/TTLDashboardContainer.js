import { connect } from 'react-redux';
import TTLDashboardMain from './TTLDasboard';
import managerProfileActions from '../../redux/actionCreators/managerProfileActions';

export const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    fetchManagerProfile: managerProfileActions
  }
)(TTLDashboardMain);
