import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { createNewProject } from '../../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({ createProject }) => ({
  createProject
});

export default connect(
  mapStateToProps,
  {
    createNewProject
  }
)(ProjectForm);
