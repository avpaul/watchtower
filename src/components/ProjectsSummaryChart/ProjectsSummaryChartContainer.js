import { connect } from 'react-redux';
import ProjectsSummaryChart from './ProjectsSummaryChart';
import ttlProjectsActions from '../../redux/actionCreators/ttlProjectsActions';
import { fetchFellowsSummaryTTLLFAction } from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';

export const mapStateToProps = ({ fellowCountHistory, fellowsSummary }) => ({
  fellowCountHistory,
  fellowsSummary
});

export default connect(
  mapStateToProps,
  {
    fetchTtlProjects: ttlProjectsActions,
    fetchFellowsSummaryTTLLF: fetchFellowsSummaryTTLLFAction
  }
)(ProjectsSummaryChart);
