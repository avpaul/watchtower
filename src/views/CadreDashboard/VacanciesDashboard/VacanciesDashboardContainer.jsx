import { connect } from 'react-redux';
import VacancyDashboard from './VacanciesDashboard';

import { getAllVacancies as getAllVacanciesAction } from '../../../redux/actionCreators/projectVacancyActions';

const mapStateToProps = ({ getAllVacancies }) => ({
  getAllVacancies
});

export default connect(
  mapStateToProps,
  {
    getAllVacanciesAction
  }
)(VacancyDashboard);
