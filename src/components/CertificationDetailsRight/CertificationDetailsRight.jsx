import React from 'react';
import PropTypes from 'prop-types';
import SellYourselfModal from '../SellYourselfModal/SellYourselfModal';
import dateCountDown, { formatCountDown } from '../../utils/dateCountDown';

class CertificationDetailsRight extends React.Component {
  state = {
    modals: {
      applicationModal: false,
      successModal: false
    }
  };

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
    const { loading, applyForCertification } = this.props;

    const { certificationInfo, vacancyInfo, userHasApplied } = this.props;
    const vacancyDetails = vacancyInfo.vacancy_details || {};

    const {
      modals: { applicationModal }
    } = this.state;

    const { cycle_id: cycleId } = vacancyDetails;

    return (
      <SellYourselfModal
        id={certificationInfo.id}
        title={certificationInfo.name}
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

  renderApplicationButton = userHasApplied => (
    <>
      {userHasApplied ? (
        <button disabled id="buttonDisabled" type="button">
          ALREADY APPLIED
        </button>
      ) : (
        <button
          id="applyButton"
          type="button"
          onClick={() => this.certificationApplicationHandler()}
        >
          APPLY
        </button>
      )}
    </>
  );

  render() {
    const { certificationInfo, vacancyInfo, userHasApplied } = this.props;
    const vacancyDetails = vacancyInfo.vacancy_details || {};
    const {
      modals: { applicationModal }
    } = this.state;
    return (
      <div className="projectAndRoleDetailContainer">
        <div className="mainHeading">
          <div className="headingLeft" />
          <div className="headingRight">
            {this.renderApplicationButton(userHasApplied)}
            <div className="vacancy__count">
              Days Left:{' '}
              <span>
                {`${formatCountDown(
                  dateCountDown(vacancyDetails.closing_date)
                )}`}
              </span>
            </div>
          </div>
        </div>
        <div className="mainBody">
          <h6 className="paragraphHeadings">Description</h6>
          <p>{certificationInfo.description}</p>
        </div>
        {applicationModal && this.renderSellYourselfModal()}
      </div>
    );
  }
}

CertificationDetailsRight.defaultProps = {
  certificationInfo: {},
  vacancyInfo: {},
  userHasApplied: false,
  loading: false
};

CertificationDetailsRight.propTypes = {
  certificationInfo: PropTypes.shape(),
  vacancyInfo: PropTypes.shape(),
  userHasApplied: PropTypes.bool,
  loading: PropTypes.bool,
  applyForCertification: PropTypes.func.isRequired
};

export default CertificationDetailsRight;
