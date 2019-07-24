import { connect } from 'react-redux';
import ViewCertificationApplicantsModal from './ViewCertificationApplicantsModal';
import { fetchCertificationApplicants } from '../../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({ certificationApplicants }) => ({
  certificationApplicants
});

export default connect(
  mapStateToProps,
  {
    fetchCertificationApplicants
  }
)(ViewCertificationApplicantsModal);
