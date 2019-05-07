import { connect } from 'react-redux';
import FellowsSummaryChart from './FellowsSummaryChart';
import fetchPerformanceData from '../../redux/actionCreators/performanceActions';

export const mapStateToProps = ({ performanceData }) => ({
  fellowsPerformanceData: performanceData
});

export default connect(
  mapStateToProps,
  {
    fetchPerformanceData
  }
)(FellowsSummaryChart);
