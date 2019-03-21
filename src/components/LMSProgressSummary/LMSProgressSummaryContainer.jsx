import { connect } from 'react-redux';
import LMSProgressSummary from './LMSProgressSummary';
import getLmsSummary from '../../redux/actionCreators/fellowLmsSummaryActions';
import getLmsSubmissions from '../../redux/actionCreators/fellowLmsSubmissionsActions';

export const mapStateToProps = state => ({
  lmsSummary: state.fellowLmsSummary.lmsSummary,
  lmsSubmissions: state.fellowLmsSubmissions.lmsSubmissions
});

const mapDispatchToProps = dispatch => ({
  getLmsSummary: () => dispatch(getLmsSummary()),
  getLmsSubmissions: () => dispatch(getLmsSubmissions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LMSProgressSummary);
