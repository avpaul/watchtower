import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import {
  createNewProject,
  editProject,
  getAProject
} from '../../../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({
  createProject,
  addProjectManager: { manager },
  addProjectTechnology: { technology },
  editSingleProject,
  getProject
}) => ({
  createProject,
  manager,
  newTechnology: technology,
  editSingleProject,
  getProject
});

export default connect(
  mapStateToProps,
  {
    createNewProject,
    editProject,
    getAProject
  }
)(ProjectForm);
