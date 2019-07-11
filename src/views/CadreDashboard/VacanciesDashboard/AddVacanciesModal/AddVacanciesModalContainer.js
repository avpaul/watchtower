import { connect } from 'react-redux';
import AddVacanciesModal from './AddVacanciesModal';
import { fetchAllProjects } from '../../../../redux/actionCreators/projectsActions';
import { createNewProjectVacancies } from '../../../../redux/actionCreators/projectVacancyActions';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = ({
  allProjects,
  createProjectVacancies,
  allRoles
}) => ({
  allProjects,
  allProjectRoles: allRoles,
  createProjectVacancies
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects,
    fetchAllRoles,
    createNewProjectVacancies
  }
)(AddVacanciesModal);
