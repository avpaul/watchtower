import { connect } from 'react-redux';
import AddCertificationModal from './AddCertificationModal';
import { addCertification } from '../../../../../redux/actionCreators/cadreAddCertificationAction';

export const mapStateToProps = ({ certifications }) => ({
  certifications
});

export default connect(
  mapStateToProps,
  {
    addCertification
  }
)(AddCertificationModal);
