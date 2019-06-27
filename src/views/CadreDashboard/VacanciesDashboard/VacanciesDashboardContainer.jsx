import { connect } from 'react-redux';
import VacancyDashboard from './VacanciesDashboard';

export const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    fetchAllProjectVacancies: () => {}
  }
)(VacancyDashboard);
