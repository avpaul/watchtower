import { connect } from 'react-redux';
import DeleteCertificationModal from './DeleteCertificationModal';
import {
  deleteCertification,
  setCertificationOnFocus
} from '../../../../redux/actionCreators/cadreCertificationAction';

export const mapStateToProps = ({
  certificationOnFocus,
  deleteCertification: { loading, error }
}) => ({
  certificationOnFocus,
  loading,
  error
});

export default connect(
  mapStateToProps,
  {
    deleteCertification,
    setCertificationOnFocus
  }
)(DeleteCertificationModal);
