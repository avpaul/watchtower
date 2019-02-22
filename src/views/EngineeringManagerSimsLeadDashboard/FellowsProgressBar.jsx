import { connect } from 'react-redux';
import TTLFellowsProgress from '../TTLDashboard/TtlFellowsProgress/TTLFellowsProgress';
import * as getLocationsActions from '../../redux/actionCreators/ttlActions';
import { getEmFellowsProgress } from '../../redux/actionCreators/fellowProgressActions';

export const mapStateToProps = ({ fellowsProgress, locations }) => ({
  fellowsProgress,
  locations
});

export default connect(
  mapStateToProps,
  {
    fetchTTLFellowsProgress: getEmFellowsProgress,
    fetchLocations: getLocationsActions.getLocations
  }
)(TTLFellowsProgress);
