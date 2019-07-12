import { connect } from 'react-redux';
import DeleteVacanciesModal from './DeleteVacanciesModal';
import {
  deleteProjectVacancies,
  setProjectVacanciesOnFocus
} from '../../../../redux/actionCreators/projectVacancyActions';

export const mapStateToProps = ({
  projectVacanciesOnFocus,
  deleteProjectVacancies: { loading, error }
}) => ({
  projectVacanciesOnFocus,
  loading,
  error
});

export default connect(
  mapStateToProps,
  {
    deleteProjectVacancies,
    setProjectVacanciesOnFocus
  }
)(DeleteVacanciesModal);
