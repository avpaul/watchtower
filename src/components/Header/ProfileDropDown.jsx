import React from 'react';
import PropTypes from 'prop-types';

import profileDefaultPic from '../../static/profile.svg';

/**
 * Returns the name of the user's role
 * @return string String name of role
 */
const renderRole = user => {
  switch (true) {
    case !!user.roles.WATCH_TOWER_EM:
      return 'Engineering Manager';
    case !!user.roles.WATCH_TOWER_SL:
      return 'Simulations Lead';
    case !!user.roles.WATCH_TOWER_LF:
      return 'Learning Facilitator';
    case !!user.roles.WATCH_TOWER_TTL:
      return 'Technical Team Lead';
    case !!user.roles.WATCH_TOWER_OPS:
      return 'Operations Manager';
    case !!user.roles.CADRE_TEAM_MANAGER:
      return 'Team Manager';
    default:
      return 'Fellow';
  }
};

const getImage = user => (!user.picture ? profileDefaultPic : user.picture);

const renderProfile = user => {
  if (!user || !user.name) return <div />;

  return (
    <div className="profile-details">
      <div className="profile-details__image">
        <img src={getImage(user)} alt={`${user.name} profile-details pic`} />
      </div>
      <div className="profile-details__right">
        <div className="profile-details__name">{user.name}</div>
        <div className="profile-details__role">{renderRole(user)}</div>
      </div>
    </div>
  );
};

const ProfileDropDown = ({ user }) => (
  <div className="dropdown-menu dropdown-menu-right">
    <div className="dropdown-item disabled pl-0 pr-0">
      {renderProfile(user)}
    </div>
    <a
      className="dropdown-item"
      data-toggle="modal"
      data-target="#logout-modal"
      href="/"
    >
      Log out
    </a>
  </div>
);

ProfileDropDown.propTypes = {
  user: PropTypes.shape().isRequired
};

export default ProfileDropDown;
