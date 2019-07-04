import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditCertificationModal from './EditCertifcationModal';
import { editCertification } from '../../redux/actionCreators/opsEditCertificationActions';

export const mapStateToProps = ({
  editCertification: editCadreCertification
}) => ({
  loading: editCadreCertification.loading,
  error: editCadreCertification.error
});

export default connect(
  mapStateToProps,
  {
    editCertification
  }
)(withRouter(EditCertificationModal));
