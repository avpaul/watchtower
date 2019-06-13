import { connect } from 'react-redux';
import AddTechnologyModal from './AddTechnologyModal';
import { addProjectTechnology } from '../../../../redux/actionCreators/projectTechnologiesActions';

export const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    addProjectTechnology
  }
)(AddTechnologyModal);
