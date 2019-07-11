import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CertificationPage from './CertificationPage';
import { getCertification as getCertificationAction } from '../../../redux/actionCreators/getCertificationActions';

export const mapStateToProps = ({ getCertification }) => ({ getCertification });

export default connect(
  mapStateToProps,
  { getCertificationAction }
)(withRouter(CertificationPage));
