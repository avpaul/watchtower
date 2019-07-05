import { connect } from 'react-redux';
import CadreViewCerts from './CadreViewCerts';
import { fetchAllCertifications } from '../../../../redux/actionCreators/cadreCertificationAction';

export const mapStateToProps = ({ allCertifications }) => ({
  allCertifications
});

export default connect(
  mapStateToProps,
  {
    fetchAllCertifications
  }
)(CadreViewCerts);
