import { connect } from 'react-redux';
import ProjectForm from './ProjectFormLeft';
import { fetchAllProjectManagers } from '../../../../redux/actionCreators/projectManagerActions';
import { fetchAllProjectTechnologies } from '../../../../redux/actionCreators/projectTechnologiesActions';

export const mapStateToProps = ({
  fetchProjectManagers,
  fetchProjectTechnologies,
  addProjectManager: { manager },
  addProjectTechnology: { technology }
}) => ({
  fetchProjectManagers,
  fetchProjectTechnologies,
  newManager: manager,
  newTechnology: technology
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjectManagers,
    fetchAllProjectTechnologies
  }
)(ProjectForm);
