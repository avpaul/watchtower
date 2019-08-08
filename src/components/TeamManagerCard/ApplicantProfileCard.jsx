import React from 'react';
import PropTypes from 'prop-types';

import './ApplicantCard.scss';

const ApplicantProfileCard = ({
  firstName,
  lastName,
  picture,
  roleName,
  projectId,
  applicationReason
}) => (
  <div className="applicant">
    <div className="applicant_profile_card_details">
      <img
        src={picture || 'https://lorempixel.com/100/100/people/?97143'} /* istanbul ignore next */
        alt=""
      />
      <br />
      <h3>
        {firstName} {lastName}
      </h3>
      <p>Applying for {roleName}</p>
      <p>{projectId}</p>
      <button type="button" className="applicant_button">
        ACCEPT
      </button>
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
  applicationReason: PropTypes.string.isRequired
};

export default ApplicantProfileCard;
