import React from 'react';
import PropTypes from 'prop-types';
import ProfileContainer from './ProfileContainer';

import './EngineerBio.scss';

const EngineerCard = ({ data }) => {
  const { fellow } = data;
  return (
    <div className="engineer-bio-wrapper">
      <h3 className="profile-card-header">My Profile</h3>
      <div className="bio-card text-center">
        {fellow ? <ProfileContainer fellow={fellow} /> : null}
      </div>
    </div>
  );
};

EngineerCard.propTypes = {
  data: PropTypes.shape().isRequired
};

export default EngineerCard;
