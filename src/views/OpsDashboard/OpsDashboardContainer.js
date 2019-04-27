import { connect } from 'react-redux';
import OpsDashboardMain from './OpsDashboard';
import getOpsSummary from '../../redux/actionCreators/opsSummaryActions';

export const mapStateToProps = ({ opsSummary: { loading, data } }) => ({
  loading,
  ...data.managers,
  fellowsCount: data.fellowsCount
});

export default connect(
  mapStateToProps,
  { getOpsSummary }
)(OpsDashboardMain);
