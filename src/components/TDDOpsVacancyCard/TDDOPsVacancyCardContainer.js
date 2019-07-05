import { connect } from 'react-redux';
import TDDOPsVacancyCard from './TDDOPsVacancyCard';
import { setProjectVacanciesOnFocus } from '../../redux/actionCreators/projectVacancyActions';

export default connect(
  () => ({}),
  {
    setVacanciesOnFocus: setProjectVacanciesOnFocus
  }
)(TDDOPsVacancyCard);
