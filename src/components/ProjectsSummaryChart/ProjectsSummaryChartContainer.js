import { connect } from 'react-redux';
import ProjectsSummaryChart from './ProjectsSummaryChart';
import managerProfileActions from '../../redux/actionCreators/managerProfileActions';
// import { fetchFellowsSummaryTTLLFAction } from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';

export const mapStateToProps = ({ manager }) => ({
  manager
});

export default connect(
  mapStateToProps,
  {
    fetchManagerProfile: managerProfileActions
  }
)(ProjectsSummaryChart);
