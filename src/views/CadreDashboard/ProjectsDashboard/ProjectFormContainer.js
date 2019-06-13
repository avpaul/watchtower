import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { createNewProject } from '../../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({
  createProject,
  addProjectManager: { manager },
  addProjectTechnology: { technology }
}) => ({
  createProject,
  manager,
  newTechnology: technology
});

export default connect(
  mapStateToProps,
  {
    createNewProject
  }
)(ProjectForm);
