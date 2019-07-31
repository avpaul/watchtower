import React from 'react';
import PropTypes from 'prop-types';
import LogOutModal from '../LogOutModal/LogOutModal';
import notificationIcon from '../../static/Notification.svg';
import CadreLogoSection from './CadreLogoSection';
import CadreLogout from './CadreLogout';

const CadreHeader = props => {
  const { renderModal, notifications, unreadnotifications, showModal } = props;
  return (
    <div>
      <LogOutModal />
      <div id="nav" className="cadre-navbar position-fixed w-100 z-index-10">
        {renderModal(notifications, unreadnotifications)}
        <div className="navbar navbar-expand flex-row m-0 px-5 py-3 justify-content-between">
          <CadreLogoSection />
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
            <CadreLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

CadreHeader.propTypes = {
  renderModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired
};

export default CadreHeader;
