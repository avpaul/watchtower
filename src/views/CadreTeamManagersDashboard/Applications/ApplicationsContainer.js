import { connect } from 'react-redux';
import Applications from './Applications';
import { fetchApplications } from '../../../redux/actionCreators/cadreTeamManager/applicationsActions';
import { acceptApplication } from '../../../redux/actionCreators/cadreTeamManager/acceptApplicationActions';

export const mapStateToProps = ({
  teamManagerProjectApplications,
  teamManagerProjectApplicant
}) => ({
  applications: teamManagerProjectApplications,
  fellow: teamManagerProjectApplicant
});

export default connect(
  mapStateToProps,
  {
    fetchApplications,
    acceptApplication
  }
)(Applications);
