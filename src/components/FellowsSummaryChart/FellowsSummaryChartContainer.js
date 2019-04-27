import { connect } from 'react-redux';
import FellowsSummaryChart from './FellowsSummaryChart';
import { fetchFellowsSummaryOps } from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';

export const mapStateToProps = ({ opsSummary, opsDashboard }) => ({
  opsSummaryLoading: opsSummary.loading,
  fellowsSummary: opsDashboard.fellowsSummary
});

export default connect(
  mapStateToProps,
  {
    getFellowSummaryOps: fetchFellowsSummaryOps
  }
)(FellowsSummaryChart);
