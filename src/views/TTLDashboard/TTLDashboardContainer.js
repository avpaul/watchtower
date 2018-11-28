import { connect } from 'react-redux';
import { TTLDashboardMain } from './TTLDasboard';

export const mapStateToProps = state => ({
  ttlProjects: state.ttlProjects
});

export default connect(
  mapStateToProps,
  null
)(TTLDashboardMain);
