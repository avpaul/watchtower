import { connect } from 'react-redux';
import { fellowsSummary } from '../../redux/actionCreators';
import FellowsSummaryChart from './FellowsSummaryChart';
import fellowCountHistoryActions from '../../redux/actionCreators/fellowCountHistoryActions';
import { fetchFellowsSummaryOps } from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';

export const mapStateToProps = ({ fellowCountHistory, opsDashboard }) => ({
  fellowCountHistory,
  fellowsSummary: opsDashboard.fellowsSummary
});

export default connect(
  mapStateToProps,
  {
    getFellowCountHistory: fellowCountHistoryActions,
    fetchFellowsSummary: fellowsSummary.fetchFellowsSummary,
    getFellowSummaryOps: fetchFellowsSummaryOps
  }
)(FellowsSummaryChart);
