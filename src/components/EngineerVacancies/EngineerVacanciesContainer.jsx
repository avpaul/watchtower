import { connect } from 'react-redux';
import EngineerVacancies from './EngineerVacancies';

const mapStateToProps = ({ cadreVacancies }) => ({
  cadreVacancies
});

export default connect(mapStateToProps)(EngineerVacancies);
