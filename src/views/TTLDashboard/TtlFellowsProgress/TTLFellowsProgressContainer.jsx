import { connect } from 'react-redux';
import TTLFellowsProgress from './TTLFellowsProgress';
import * as getLocationsActions from '../../../redux/actionCreators/ttlActions';
import getFellowProgressAction from '../../../redux/actionCreators/fellowProgressActions';

export const mapStateToProps = ({ fellowsProgress, locations }) => ({
  fellowsProgress,
  locations
});

export default connect(
  mapStateToProps,
  {
    fetchTTLFellowsProgress: getFellowProgressAction,
    fetchLocations: getLocationsActions.getLocations
  }
)(TTLFellowsProgress);
