import { connect } from 'react-redux';
import ProjectsSummaryChart from './ProjectsSummaryChart';
import fetchPerformanceData from '../../redux/actionCreators/performanceActions';

export const mapStateToProps = ({ performanceData }) => ({
  performanceData
});

export default connect(
  mapStateToProps,
  {
    fetchPerformanceData
  }
)(ProjectsSummaryChart);
