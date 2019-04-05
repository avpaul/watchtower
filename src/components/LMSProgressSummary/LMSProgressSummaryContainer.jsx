import { connect } from 'react-redux';
import LMSProgressSummary from './LMSProgressSummary';

export const mapStateToProps = ({ fellow }) => ({
  fellow
});

export default connect(mapStateToProps)(LMSProgressSummary);
