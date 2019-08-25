import { connect } from 'react-redux';
import ViewCertificatedEngineersModal from './ViewCertificatedEngineersModal';
import { fetchCertifiedEngineers } from '../../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({ certifiedEngineers }) => ({
  certifiedEngineers
});

export default connect(
  mapStateToProps,
  {
    fetchCertifiedEngineers
  }
)(ViewCertificatedEngineersModal);
