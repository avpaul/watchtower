import React from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropDown';
import { truncate } from '../../utils';

const ProfileSection = ({ user }) => (
  <div id="profile-menu" className="dropdown">
    <div
      className="d-flex flex-row align-items-center .dropdown-toggle"
      data-toggle="dropdown"
    >
      <div className="d-flex pr-3 align-items-center">
        <img className="user__image" src={user.picture} alt="User" />
        <span className="user__text d-none d-sm-inline-block d-md-inline-block d-lg-inline-block text-center">
          {truncate(user.name, 14)}
        </span>
      </div>
      <i className="fas fa-caret-down header__dropdown" />
    </div>

    <ProfileDropdown user={user} />
  </div>
);

ProfileSection.propTypes = {
  user: PropTypes.shape().isRequired
};

export default ProfileSection;
