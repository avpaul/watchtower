import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RolePage from './ProjectRoleDetails';
import { getAProject } from '../../../redux/actionCreators/projectsActions';
import { fetchAllVacancies } from '../../../redux/actionCreators/getCadreVacanciesAction';

export const mapStateToProps = ({ singleProject, cadreVacancies }, props) => {
  const { location } = props;
  const projectId = Number(location.pathname.split('/')[3]);
  return {
    singleProject: singleProject.data[projectId] || {},
    AllVacantRoles: cadreVacancies.data.projectVacancies,
    allProjects: singleProject.data
  };
};

export default connect(
  mapStateToProps,
  {
    getAProject,
    fetchAllVacancies
  }
)(withRouter(RolePage));
