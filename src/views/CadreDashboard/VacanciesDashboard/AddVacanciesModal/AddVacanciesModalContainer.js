import { connect } from 'react-redux';
import AddVacanciesModal from './AddVacanciesModal';
import { fetchAllProjects } from '../../../../redux/actionCreators/projectsActions';
import {
  createNewProjectVacancies,
  editProjectVacancies
} from '../../../../redux/actionCreators/projectVacancyActions';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';
import createNewCertificationVacancy from '../../../../redux/actionCreators/certificationVacancyAction';
import { fetchAllCertifications } from '../../../../redux/actionCreators/cadreCertificationAction';

export const mapStateToProps = ({
  allProjects,
  createProjectVacancies,
  allRoles,
  projectVacanciesOnFocus,
  editProjectVacancies: editProjectVacanciesState,
  allCertifications,
  createCertificactionVacancies
}) => ({
  allProjects,
  allProjectRoles: allRoles,
  createProjectVacancies,
  projectVacanciesOnFocus,
  editProjectVacanciesState,
  editMode: !!projectVacanciesOnFocus.project,
  allCertifications,
  createCertificactionVacancies
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects,
    fetchAllRoles,
    createNewProjectVacancies,
    editProjectVacancies,
    fetchAllCertifications,
    createNewCertificationVacancy
  }
)(AddVacanciesModal);
