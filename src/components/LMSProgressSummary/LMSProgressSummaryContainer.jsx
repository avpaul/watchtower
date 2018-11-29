import { connect } from 'react-redux';
import LMSProgressSummary from './LMSProgressSummary';
import getFellowLMSRatings from '../../redux/actionCreators/fellowLmsRatingActions';

export const mapStateToProps = ({ fellowLmsRatings }) => ({
  loading: fellowLmsRatings.loading,
  fellowLmsRatings
});

export default connect(
  mapStateToProps,
  { getFellowLMSRatings }
)(LMSProgressSummary);
