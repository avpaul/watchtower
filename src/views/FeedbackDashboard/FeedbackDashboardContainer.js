import { connect } from 'react-redux';
import FeedbackDashboard from './FeedbackDashboard';
import getManagerFeedback from '../../redux/actionCreators/managerFeedbackActions';

export const mapStateToProps = ({ feedback }) => ({
  loading: feedback.loading,
  data: feedback.data,
  error: feedback.error
});
export default connect(
  mapStateToProps,
  { getManagerFeedback }
)(FeedbackDashboard);
