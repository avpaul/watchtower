import { connect } from 'react-redux';
import VacancyDashboard from './VacanciesDashboard';
import {
  getAllVacancies as getAllVacanciesAction,
  setProjectVacanciesOnFocus
} from '../../../redux/actionCreators/projectVacancyActions';

export const mapStateToProps = ({ getAllVacancies }) => ({
  getAllVacancies
});

export default connect(
  mapStateToProps,
  {
    getAllVacanciesAction,
    setProjectVacanciesOnFocus
  }
)(VacancyDashboard);
