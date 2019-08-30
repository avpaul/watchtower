import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CertificationPage from './CertificationPage';
import { getCertification as getCertificationAction } from '../../../redux/actionCreators/getCertificationActions';
import { applyForCertification } from '../../../redux/actionCreators/cadreCertificationActions';
import { fetchAllVacancies } from '../../../redux/actionCreators/getCadreVacanciesAction';

export const mapStateToProps = (
  {
    getCertification,
    certificationApplication,
    d1Fellow,
    cadreVacancies: {
      data: { certificationVacancies },
      loading
    }
  },
  props
) => {
  const { location } = props;
  const certificationId = Number(location.pathname.split('/')[3]);

  return {
    getCertification,
    certificationApplication,
    d1Fellow,
    certificationVacancies,
    loading,
    singleCertification: getCertification.data[certificationId] || {}
  };
};

export default connect(
  mapStateToProps,
  { getCertificationAction, applyForCertification, fetchAllVacancies }
)(withRouter(CertificationPage));
