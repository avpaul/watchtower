import { connect } from 'react-redux';
import AddVacanciesModal from './AddVacanciesModal';
import { fetchAllProjects } from '../../../../redux/actionCreators/projectsActions';
import {
  createNewProjectVacancies,
  editProjectVacancies
} from '../../../../redux/actionCreators/projectVacancyActions';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = ({
  allProjects,
  createProjectVacancies,
  allRoles,
  projectVacanciesOnFocus,
  editProjectVacancies: editProjectVacanciesState
}) => ({
  allProjects,
  allProjectRoles: allRoles,
  createProjectVacancies,
  projectVacanciesOnFocus,
  editProjectVacanciesState,
  editMode: !!projectVacanciesOnFocus.project
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects,
    fetchAllRoles,
    createNewProjectVacancies,
    editProjectVacancies
  }
)(AddVacanciesModal);
