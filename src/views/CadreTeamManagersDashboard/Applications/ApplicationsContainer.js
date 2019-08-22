import { connect } from 'react-redux';
import Applications from './Applications';
import { fetchApplications } from '../../../redux/actionCreators/cadreTeamManager/applicationsActions';

export const mapStateToProps = ({ teamManagerProjectApplications }) => ({
  applications: teamManagerProjectApplications
});

export default connect(
  mapStateToProps,
  {
    fetchApplications
  }
)(Applications);
