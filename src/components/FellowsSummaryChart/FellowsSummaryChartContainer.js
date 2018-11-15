import { connect } from 'react-redux';
import FellowsSummaryChart from './FellowsSummaryChart';
import fellowCountHistoryActions from '../../redux/actionCreators/fellowCountHistoryActions';

export const mapStateToProps = ({ fellowCountHistory }) => ({
  fellowCountHistory
});
export default connect(
  mapStateToProps,
  { getFellowCountHistory: fellowCountHistoryActions }
)(FellowsSummaryChart);