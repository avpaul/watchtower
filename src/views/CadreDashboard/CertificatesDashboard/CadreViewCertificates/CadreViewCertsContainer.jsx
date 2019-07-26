import { connect } from 'react-redux';
import CadreViewCerts from './CadreViewCerts';
import {
  fetchAllCertifications,
  setCertificationOnFocus
} from '../../../../redux/actionCreators/cadreCertificationActions';

export const mapStateToProps = ({ allCertifications }) => ({
  allCertifications
});

export default connect(
  mapStateToProps,
  {
    fetchAllCertifications,
    setCertificationOnFocus
  }
)(CadreViewCerts);
