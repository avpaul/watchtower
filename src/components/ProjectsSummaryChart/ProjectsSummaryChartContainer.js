import { connect } from 'react-redux';
import ProjectsSummaryChart from './ProjectsSummaryChart';
import ttlProjectsActions from '../../redux/actionCreators/ttlProjectsActions';

export const mapStateToProps = ({ fellowCountHistory }) => ({
  fellowCountHistory
});

export default connect(
  mapStateToProps,
  {
    fetchTtlProjects: ttlProjectsActions
  }
)(ProjectsSummaryChart);
