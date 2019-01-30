import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogOutModal from '../LogOutModal/LogOutModal';
import watchTowerLogo from '../../static/Logo.svg';
import notificationIcon from '../../static/Notification.svg';
import truncate from '../../utils';
import Menu from './Menu';
import { getMenuItems } from './navlinks';

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
        <Link to="/dashboard" className="logo">
          <img
            className="watch-tower__logo"
            src={watchTowerLogo}
            alt="watch tower logo"
          />
          <span className="watch-tower d-none d-sm-inline-block">
            WatchTower
          </span>
        </Link>
        <div className="d-flex flex-row">
          <span
            className="notification"
            onClick={showModal}
            onKeyDown=""
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
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#logout-modal"
                href="/"
              >
                Log out
              </a>
            </div>
          </div>
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
  activeItems: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  role: PropTypes.string.isRequired
};

export default FellowHeader;
