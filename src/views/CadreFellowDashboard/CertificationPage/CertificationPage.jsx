import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import backIcon from '../../../static/BackIcon.png';
import certificationIcon from '../../../static/Project.svg';
import './CertificationPage.scss';
import SellYourselfModal from '../../../components/SellYourselfModal/SellYourselfModal';

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
      getCertification: {
        loading,
        data: { applications }
      }
    } = this.props;
    if (prevProps.getCertification.loading !== loading) {
      this.checkIfUserHasApplied(applications);
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

  certificationApplicationHandler = () => {
    this.modalHandler('applicationModal');
  };

  renderSellYourselfModal = () => {
    const {
      applyForCertification,
      getCertification: {
        data: { id, name },
        loading
      }
    } = this.props;
    const {
      modals: { applicationModal }
    } = this.state;

    return (
      <SellYourselfModal
        id={id}
        title={name}
        buttonLabel="Apply for this certification"
        submitHandler={applyForCertification}
        modalHandler={() => this.modalHandler('applicationModal')}
        showModal={applicationModal}
        loading={loading}
      />
    );
  };

  checkIfUserHasApplied = applications => {
    const { d1Engineer } = this.props;
    if (applications) {
      const hasApplied = applications.find(
        application => application.fellow_id === d1Engineer.fellow_id
      );
      if (hasApplied) this.setState({ userHasApplied: true });
    }
  };

  render() {
    const {
      getCertification: { loading, data }
    } = this.props;

    const {
      modals: { applicationModal },
      userHasApplied
    } = this.state;

    return (
      <Fragment>
        <div className="certification-page">
          <div className="container">
            {this.renderBackNavigation()}
            {!loading && this.renderCard(data, userHasApplied)}
            {applicationModal && this.renderSellYourselfModal()}
          </div>
        </div>
      </Fragment>
    );
  }
}

CertificationPage.propTypes = {
  getCertificationAction: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  applyForCertification: PropTypes.func.isRequired,
  d1Engineer: PropTypes.instanceOf(Object).isRequired,
  getCertification: PropTypes.instanceOf(Object).isRequired
};

export default CertificationPage;
