import { connect } from 'react-redux';
import VacancyDashboard from './VacanciesDashboard';
import {
  getAllVacancies as getAllVacanciesAction,
  setProjectVacanciesOnFocus,
  getAllVacanciesWithNoCycleId
} from '../../../redux/actionCreators/projectVacancyActions';

export const mapStateToProps = ({
  getAllVacancies,
  cadreVacanciesWithNoCycleId
}) => ({
  getAllVacancies,
  cadreVacanciesWithNoCycleId
});

export default connect(
  mapStateToProps,
  {
    getAllVacanciesAction,
    setProjectVacanciesOnFocus,
    getAllVacanciesWithNoCycleId
  }
)(VacancyDashboard);
