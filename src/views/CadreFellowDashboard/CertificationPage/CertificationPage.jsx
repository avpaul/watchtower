import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import backIcon from '../../../static/BackIcon.png';
import certificationIcon from '../../../static/Project.svg';
import './CertificationPage.scss';

class CertificationPage extends Component {
  async componentDidMount() {
    const {
      getCertificationAction,
      match: { params }
    } = this.props;
    await getCertificationAction(params.certificationId);
  }

  renderBackNavigation = () => {
    const { history } = this.props;
    return (
      <div className="row mt-5 mb-4">
        <div className="col-md-12">
          <div
            id="nav"
            onClick={() => history.push('/dashboard')}
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

  cardHead = (title, exclusive) => (
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
          <button
            className="btn btn-primary text-uppercase apply-btn"
            type="button"
          >
            Apply For This Certification
          </button>
        </div>
      </div>
    </div>
  );

  renderCard = data => (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card certification-card">
          {this.cardHead(data.name, data.exclusive)}
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

  render() {
    const {
      getCertification: { loading, data }
    } = this.props;
    return (
      <Fragment>
        <div className="certification-page">
          <div className="container">
            {this.renderBackNavigation()}
            {!loading && this.renderCard(data)}
          </div>
        </div>
      </Fragment>
    );
  }
}

CertificationPage.propTypes = {
  getCertificationAction: PropTypes.isRequired,
  history: PropTypes.isRequired,
  getCertification: PropTypes.isRequired,
  match: PropTypes.isRequired
};

export default CertificationPage;
