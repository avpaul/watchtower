import { connect } from 'react-redux';
import DeleteVacanciesModal from './DeleteVacanciesModal';
import {
  deleteProjectVacancies, setProjectVacanciesOnFocus
} from '../../../../redux/actionCreators/projectVacancyActions';
import { deleteCertificationVacancies } from '../../../../redux/actionCreators/certificationVacancyAction';

export const mapStateToProps = ({
  projectVacanciesOnFocus,
  deleteProjectVacancies: {
    loading: loadingProject,
    error: errorProject,
  },
  deleteCertificationVacancies: {
    loading: loadingCertification,
    error: errorCertification
  }
}) => ({
  projectVacanciesOnFocus,
  loadingProject,
  errorProject,
  loadingCertification,
  errorCertification
});

export default connect(
  mapStateToProps,
  {
    deleteProjectVacancies,
    deleteCertificationVacancies,
    setProjectVacanciesOnFocus
  }
)(DeleteVacanciesModal);
