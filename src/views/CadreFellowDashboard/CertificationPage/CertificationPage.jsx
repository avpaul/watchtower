import React, { Component, Fragment } from 'react';
import PropTypes, { array } from 'prop-types';
import backIcon from '../../../static/BackIcon.png';
import './CertificationPage.scss';
import PMLoader from '../../../components/CustomLoader/PMLoader';
import CertificationDetailsLeft from '../../../components/CertificationDetailsLeft';
import CertificationDetailsRight from '../../../components/CertificationDetailsRight';
import '../ProjectRoleDetails/ProjectRoleDetails.scss';

class CertificationPage extends Component {
  state = {
    userHasApplied: false
  };

  componentDidMount() {
    const {
      getCertificationAction,
      match: { params },
      singleCertification,
      fetchAllVacancies,
      certificationVacancies
    } = this.props;

    const { vacanciesAreNotAvailable } = this;
    if (vacanciesAreNotAvailable()) {
      fetchAllVacancies();
    }
    if (Object.keys(singleCertification).length === 0) {
      getCertificationAction(params.certificationId);
    }
    return (
      certificationVacancies &&
      this.checkIfUserHasApplied(certificationVacancies)
    );
  }

  componentDidUpdate(prevProps) {
    const {
      loading,
      getCertification: { loading: getCertificationLoading },
      certificationVacancies
    } = this.props;

    if (
      prevProps.loading !== loading ||
      prevProps.getCertification.loading !== getCertificationLoading
    ) {
      this.checkIfUserHasApplied(certificationVacancies);
    }
  }

  vacanciesAreNotAvailable = () => {
    const { certificationVacancies } = this.props;
    return (
      !certificationVacancies || Object.keys(certificationVacancies).length < 1
    );
  };

  renderBackNavigation = () => {
    const { history } = this.props;
    return (
      <div className="row mt-5 mb-4">
        <div className="col-md-12">
          <div
            id="nav"
            onClick={() => history.goBack()}
            role="button"
            tabIndex="-1"
            onKeyDown={null}
          >
            <img src={backIcon} className="back-icon" alt="back icon" />
            <span className="ml-3 back-icon-text">Back to Dashboard</span>
          </div>
        </div>
      </div>
    );
  };

  renderCard = (data, userHasApplied) => {
    const {
      certificationVacancies,
      match: { params },
      applyForCertification,
      loading
    } = this.props;

    const currentVacancy = this.getCurrentVacancy(
      certificationVacancies,
      params.certificationId
    );
    return (
      <>
        <CertificationDetailsLeft
          certificationInfo={data}
          vacancyInfo={currentVacancy}
        />
        <CertificationDetailsRight
          certificationInfo={data}
          vacancyInfo={currentVacancy}
          userHasApplied={userHasApplied}
          applyForCertification={applyForCertification}
          loading={loading}
        />
      </>
    );
  };

  checkIfUserHasApplied = vacancies => {
    const {
      d1Engineer,
      match: {
        params: { certificationId }
      }
    } = this.props;
    if (vacancies) {
      const currentVacancy = this.getCurrentVacancy(vacancies, certificationId);

      const hasApplied = !!currentVacancy.vacancy_details.applications.find(
        application => application.fellow_id === d1Engineer.fellow_id
      );

      this.setState({ userHasApplied: hasApplied });
    }
  };

  getCurrentVacancy = (vacancies = [], certificationId) =>
    vacancies.find(
      vacancy => vacancy.certification.id === Number(certificationId)
    );

  render() {
    const {
      getCertification: { loading },
      singleCertification
    } = this.props;
    const { userHasApplied } = this.state;

    return !loading ? (
      <Fragment>
        <div className="certification-page role-details-container">
          <div className="container">
            {this.renderBackNavigation()}
            {!loading &&
              singleCertification &&
              this.renderCard(singleCertification, userHasApplied)}
          </div>
        </div>
      </Fragment>
    ) : (
      <PMLoader />
    );
  }
}

CertificationPage.propTypes = {
  getCertificationAction: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  applyForCertification: PropTypes.func.isRequired,
  d1Engineer: PropTypes.instanceOf(Object).isRequired,
  getCertification: PropTypes.instanceOf(Object).isRequired,
  certificationVacancies: PropTypes.instanceOf(array).isRequired,
  loading: PropTypes.bool.isRequired,
  singleCertification: PropTypes.instanceOf(Object).isRequired,
  fetchAllVacancies: PropTypes.func.isRequired
};

export default CertificationPage;
