import { connect } from 'react-redux';
import TTLFellowsProgress from '../TTLDashboard/TtlFellowsProgress/TTLFellowsProgress';
import getFellowProgress from '../../redux/actionCreators/fellowProgressActions';

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
    fetchTTLFellowsProgress: getFellowProgress
  }
)(TTLFellowsProgress);
