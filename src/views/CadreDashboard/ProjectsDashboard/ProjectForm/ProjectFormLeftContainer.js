import { connect } from 'react-redux';
import ProjectForm from './ProjectFormLeft';
import { fetchAllProjectManagers } from '../../../../redux/actionCreators/projectManagerActions';
import { fetchAllProjectTechnologies } from '../../../../redux/actionCreators/projectTechnologiesActions';
import { fetchAllSlackChannels } from '../../../../redux/actionCreators/slackChannelActions';

export const mapStateToProps = ({
  fetchProjectManagers,
  fetchProjectTechnologies,
  addProjectManager: { manager },
  addProjectTechnology: { technology },
  fetchSlackChannels
}) => ({
  fetchProjectManagers,
  fetchProjectTechnologies,
  newManager: manager,
  newTechnology: technology,
  fetchSlackChannels
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjectManagers,
    fetchAllProjectTechnologies,
    fetchAllSlackChannels
  }
)(ProjectForm);
