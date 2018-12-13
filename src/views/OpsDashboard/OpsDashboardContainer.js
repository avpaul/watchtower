import { connect } from 'react-redux';
import OpsDashboardMain from './OpsDashboard';
import getManagers from '../../redux/actionCreators/managerActions';

export const mapStateToProps = ({ managers }) => ({
  loading: managers.loading,
  ttls: managers.ttls,
  lfs: managers.lfs,
  averageFellowsPerTtl: managers.averageFellowsPerTtl,
  averageFellowsPerLf: managers.averageFellowsPerLf
});

export default connect(
  mapStateToProps,
  { getManagers }
)(OpsDashboardMain);
