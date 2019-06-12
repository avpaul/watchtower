import React from 'react';
import PropTypes from 'prop-types';

const ProfileCard = ({ firstName, lastName, picture }) => (
  <div className="profile_card">
    <div className=" profile_card_details text-center">
      <img
        src={picture || 'https://lorempixel.com/100/100/people/?97143'}
        alt=""
      />
      <h3>
        {firstName} {lastName}
      </h3>
      <p>D1 Engineer</p>
      <h4>Cadre Program</h4>
    </div>
  </div>
);

ProfileCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired
};

export default ProfileCard;
