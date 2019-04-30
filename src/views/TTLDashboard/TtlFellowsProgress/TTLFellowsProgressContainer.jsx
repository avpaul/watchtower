import { connect } from 'react-redux';
import TTLFellowsProgress from './TTLFellowsProgress';
import getFellowProgressAction from '../../../redux/actionCreators/fellowProgressActions';

export const mapStateToProps = ({ fellowsProgress, manager }) => ({
  fellowsProgress,
  locations: manager.data.locations
});

export default connect(
  mapStateToProps,
  {
    fetchTTLFellowsProgress: getFellowProgressAction
  }
)(TTLFellowsProgress);
