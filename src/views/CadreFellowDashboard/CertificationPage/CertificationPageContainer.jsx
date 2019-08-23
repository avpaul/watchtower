import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CertificationPage from './CertificationPage';
import { getCertification as getCertificationAction } from '../../../redux/actionCreators/getCertificationActions';
import { applyForCertification } from '../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({ getCertification, certificationApplication, d1Fellow, cadreVacancies: { data: { certificationVacancies }, loading } }) => ({
  getCertification,
  certificationApplication,
  d1Fellow,
  certificationVacancies,
  loading
});

export default connect(
  mapStateToProps,
  { getCertificationAction, applyForCertification }
)(withRouter(CertificationPage));
