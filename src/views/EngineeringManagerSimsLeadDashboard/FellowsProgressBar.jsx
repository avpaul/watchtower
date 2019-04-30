import { connect } from 'react-redux';
import TTLFellowsProgress from '../TTLDashboard/TtlFellowsProgress/TTLFellowsProgress';
import { getEmFellowsProgress } from '../../redux/actionCreators/fellowProgressActions';

export const mapStateToProps = ({
  fellowsProgress,
  engineeringManagerSimsLeads
}) => ({
  fellowsProgress,
  locations: engineeringManagerSimsLeads.data.locations
});

export default connect(
  mapStateToProps,
  {
    fetchTTLFellowsProgress: getEmFellowsProgress
  }
)(TTLFellowsProgress);
