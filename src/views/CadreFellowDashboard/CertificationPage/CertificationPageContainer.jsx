import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CertificationPage from './CertificationPage';
import { getCertification as getCertificationAction } from '../../../redux/actionCreators/getCertificationActions';
import { applyForCertification } from '../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({ getCertification, certificationApplication, d1Fellow }) => ({
  getCertification,
  certificationApplication,
  d1Fellow
});

export default connect(
  mapStateToProps,
  { getCertificationAction, applyForCertification }
)(withRouter(CertificationPage));
