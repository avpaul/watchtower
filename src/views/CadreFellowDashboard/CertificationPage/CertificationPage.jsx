import React, { Component, Fragment } from 'react';
import PropTypes, { array } from 'prop-types';
import backIcon from '../../../static/BackIcon.png';
import certificationIcon from '../../../static/Project.svg';
import './CertificationPage.scss';
import SellYourselfModal from '../../../components/SellYourselfModal/SellYourselfModal';
import PMLoader from '../../../components/CustomLoader/PMLoader';

class CertificationPage extends Component {
  state = {
    modals: {
      applicationModal: false,
      successModal: false
    },
    userHasApplied: false
  };

  async componentDidMount() {
    const {
      getCertificationAction,
      match: { params }
    } = this.props;
    await getCertificationAction(params.certificationId);
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

  cardHead = (title, exclusive, id, userHasApplied) => (
    <div className="card-header certification-header bg-white border-none">
      <div className="row px-4 mt-4 mb-2">
        <div className="col-md-6">
          <div className="row">
            <div className="col-2">
              <img src={certificationIcon} alt="certification icon" />
            </div>
            <div className="col-8">
              <h4 className="certification-title text-capitalize">{title}</h4>
              <h5 className="certification-title-sub-heading">
                {exclusive ? 'Exclusive' : 'Not Exclusive'}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-right">
          {userHasApplied ? (
            <button
              className="btn text-uppercase apply-btn"
              type="button"
              id="buttonDisabled"
              disabled
            >
              Already Applied
            </button>
          ) : (
            <button
              className="btn btn-primary text-uppercase apply-btn"
              type="button"
              onClick={() => this.certificationApplicationHandler(id)}
            >
              Apply For This Certification
            </button>
          )}
        </div>
      </div>
    </div>
  );

  renderCard = (data, userHasApplied) => (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card certification-card">
          {this.cardHead(data.name, data.exclusive, data.id, userHasApplied)}
          <div className="card-body">
            <div className="px-4">
              <h3 className="certification-description-title">
                Certification Description
              </h3>
              <p className="certification-description">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  modalHandler = slice => {
    this.setState(prevState => ({
      modals: {
        ...prevState.modals,
        [slice]: !prevState.modals[slice]
      }
    }));
  };

  certificationApplicationHandler = () => this.modalHandler('applicationModal');

  renderSellYourselfModal = () => {
    const {
      applyForCertification,
      getCertification: {
        data: { id, name }
      },
      certificationVacancies,
      match: { params },
      loading
    } = this.props;
    const {
      modals: { applicationModal },
      userHasApplied
    } = this.state;

    const currentVacancy = this.getCurrentVacancy(
      certificationVacancies,
      params.certificationId
    );

    const { cycle_id: cycleId } = currentVacancy.vacancy_details;

    return (
      <SellYourselfModal
        id={id}
        title={name}
        buttonLabel="Apply for this certification"
        submitHandler={applyForCertification}
        modalHandler={() => this.modalHandler('applicationModal')}
        showModal={applicationModal}
        loading={loading}
        cycleId={cycleId}
        hasApplied={userHasApplied}
      />
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

      if (hasApplied) this.setState({ userHasApplied: true });
    }
  };

  getCurrentVacancy = (vacancies, certificationId) =>
    vacancies.find(
      vacancy => vacancy.certification.id === Number(certificationId)
    );

  render() {
    const {
      getCertification: { loading, data }
    } = this.props;
    const {
      modals: { applicationModal },
      userHasApplied
    } = this.state;

    return !loading ? (
      <Fragment>
        <div className="certification-page">
          <div className="container">
            {this.renderBackNavigation()}
            {!loading && this.renderCard(data, userHasApplied)}
            {applicationModal && this.renderSellYourselfModal()}
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
  loading: PropTypes.bool.isRequired
};

export default CertificationPage;
