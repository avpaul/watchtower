import { connect } from 'react-redux';
import PrePipNotificationForm from './PrePipNotificationForm';

const mapStateToProps = state => ({
  fellowFeedback: state.fellowFeedback
});

export default connect(mapStateToProps)(PrePipNotificationForm);
