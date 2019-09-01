import React from 'react';
import PropTypes from 'prop-types';

import './ApplicantCard.scss';

const ApplicantProfileCard = ({
  firstName,
  lastName,
  picture,
  roleName,
  projectId,
  applicationReason,
  acceptApplicationHandler,
  applicationId,
  isVacancyClosed,
  VacancyCloseCountdown,
  hideDrawer,
  fellowAvailability
}) => (
  <div className="applicant">
    <span className="closeApp" aria-hidden="true" onClick={() => hideDrawer()}>
      &times;
    </span>
    <div className="applicant_profile_card_details">
      <img
        src={
          picture || 'https://lorempixel.com/100/100/people/?97143'
        } /* istanbul ignore next */
        alt=""
      />
      <br />
      <h3>
        {firstName} {lastName}
      </h3>
      <p>Applying for {roleName}</p>
      <p>{projectId}</p>
      {!fellowAvailability ? (
        <button
          type="button"
          className="applicant_button"
          onClick={e => acceptApplicationHandler(e, applicationId)}
          data-test="accept-button"
          disabled={!isVacancyClosed}
        >
          ACCEPT
        </button>
      ) : (
        <p className="unavailable_engineer">
          Engineer is currently unavailable
        </p>
      )}
      {!isVacancyClosed && (
        <div className="applications_not_closed">
          Applications {VacancyCloseCountdown}
        </div>
      )}
      <div className="line" />
      <div className="applicant_sell_yourself">
        <span className="sell_yourself">Sell Yourself in one sentence</span>
        <br />
        <span className="sell_yourself_text">{applicationReason}</span>
      </div>
    </div>
  </div>
);

ApplicantProfileCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  applicationReason: PropTypes.string.isRequired,
  acceptApplicationHandler: PropTypes.func.isRequired,
  applicationId: PropTypes.number.isRequired,
  isVacancyClosed: PropTypes.bool.isRequired,
  VacancyCloseCountdown: PropTypes.string.isRequired,
  hideDrawer: PropTypes.func.isRequired,
  fellowAvailability: PropTypes.string.isRequired
};

export default ApplicantProfileCard;
