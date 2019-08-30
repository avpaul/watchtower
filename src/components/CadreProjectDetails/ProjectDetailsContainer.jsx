import { connect } from 'react-redux';
import ProjectDetails from './ProjectDetails';
import { getAProject } from '../../redux/actionCreators/projectsActions';
import { fetchAllRoles } from '../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = (
  { allProjects, singleProject, allRoles },
  props
) => {
  const { location } = props;
  const projectId = Number(location.pathname.split('/')[3]);

  return {
    allProjects,
    singleProject: singleProject.data[projectId] || {},
    cadreRoles: allRoles.data
  };
};

const mapDispatchToProps = dispatch => ({
  getProject: id => dispatch(getAProject(id)),
  fetchAllRoles: () => dispatch(fetchAllRoles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
