import { connect } from 'react-redux';
import AddVacanciesModal from './AddVacanciesModal';
import { fetchAllProjects } from '../../../../redux/actionCreators/projectsActions';
import {
  createNewProjectVacancies,
  editProjectVacancies
} from '../../../../redux/actionCreators/projectVacancyActions';
import { fetchAllRoles } from '../../../../redux/actionCreators/cadreProjectRoleActions';
import {
  createNewCertificationVacancy,
  editCertificationVacancy
} from '../../../../redux/actionCreators/certificationVacancyAction';
import { fetchAllCertifications } from '../../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({
  allProjects,
  createProjectVacancies,
  allRoles,
  projectVacanciesOnFocus,
  editProjectVacancies: editProjectVacanciesState,
  editCertificationVacancies: editCertificationVacanciesState,
  allCertifications,
  createCertificactionVacancies
}) => ({
  allProjects,
  allProjectRoles: allRoles,
  createProjectVacancies,
  projectVacanciesOnFocus,
  editProjectVacanciesState,
  editCertificationVacanciesState,
  editMode:
    !!projectVacanciesOnFocus.project ||
    !!projectVacanciesOnFocus.certification,
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
    editCertificationVacancy,
    fetchAllCertifications,
    createNewCertificationVacancy
  }
)(AddVacanciesModal);
