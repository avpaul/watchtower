import { connect } from 'react-redux';
import ProjectDetails from './ProjectDetails';
import { getAProject } from '../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({ allProjects, singleProject }) => ({
  allProjects,
  singleProject
});

const mapDispatchToProps = dispatch => ({
  getProject: id => dispatch(getAProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
