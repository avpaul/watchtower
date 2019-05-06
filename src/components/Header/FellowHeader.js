import React from 'react';
import PropTypes from 'prop-types';
import LogOutModal from '../LogOutModal/LogOutModal';
import notificationIcon from '../../static/Notification.svg';
import Menu from './Menu';
import { getMenuItems } from './navlinks';
import LogoSection from './LogoSection';
import ProfileSection from './ProfileSection';

const FellowHeader = props => {
  const {
    renderModal,
    notifications,
    unreadnotifications,
    showModal,
    user,
    handleMenuClick,
    activeItems,
    role
  } = props;
  return (
    <div id="nav" className="header">
      <LogOutModal />
      {renderModal(notifications, unreadnotifications)}
      <div className="navbar navbar-expand flex-row m-0 px-5 py-3 justify-content-between">
        <LogoSection />
        <div className="d-flex flex-row">
          <span
            className="notification"
            onClick={showModal}
            role="presentation"
          >
            <img
              className="notification__icon"
              src={notificationIcon}
              alt="notificationIcon"
            />
            <i
              className={
                unreadnotifications.length > 0 ? 'notification__icon' : ''
              }
            />
          </span>
          <ProfileSection user={user} />
        </div>
      </div>
      <hr className="header__divider" />
      <Menu
        user={user}
        role={role}
        items={getMenuItems(role)}
        handleMenuClick={handleMenuClick}
        activeItems={activeItems}
      />
    </div>
  );
};

FellowHeader.propTypes = {
  renderModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  activeItems: PropTypes.shape({}).isRequired,
  notifications: PropTypes.shape({}).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  role: PropTypes.string.isRequired
};

export default FellowHeader;
