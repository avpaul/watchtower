import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapValues from 'lodash.mapvalues';
import PropTypes from 'prop-types';
import './Header.css';
import { connect } from 'react-redux';
import moment from 'moment';
import Menu from './Menu';
import { getMenuItems } from './navlinks';
import watchTowerLogo from '../../static/Logo.svg';
import notificationIcon from '../../static/Notification.svg';
import LogOutModal from '../LogOutModal/LogOutModal';
import truncate from '../../utils';
import OffTrackIcon from '../../static/OffTrack.svg';
import OnTrackIcon from '../../static/OnTrack.svg';
import { Modal } from '../Notifications/Modal';
import { splitDate, groupedDate } from '../../services/helper';
import getFellowNotification from '../../redux/actionCreators/fellowNotifications';
import getFellowUnreadNotification from '../../redux/actionCreators/fellowNotificationsUnread';
import getFellowReadNotification from '../../redux/actionCreators/fellowNotificationsRead';
import renderArchiveHeader from '../Notifications/ArchiveHeader';
import renderNotificationHeader from '../Notifications/NotificationHeader';
import renderMessageHeader from '../Notifications/MessageHeader';

/**
 * Header UI Component
 *
 * @returns {JSX} React component
 */
export class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeItems: {
        fellows: true,
        dashboard: true,
        settings: false
      },
      show: false,
      viewNotifications: true
    };
  }

  componentDidMount() {
    const { user, getNotification, getUnreadNotification } = this.props;
    getNotification(user.email);
    getUnreadNotification(user.email);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  clearNotification = () => {
    const { getReadNotification, user, getUnreadNotification } = this.props;
    getReadNotification(user.email);
    getUnreadNotification(user.email);
  };

  handleMenuClick = event => {
    const key = event.currentTarget.dataset.linkKey;
    const { activeItems } = this.state;
    if (!activeItems[key]) {
      const newactiveItems = mapValues(activeItems, () => false);
      newactiveItems[key] = true;
      this.setState({ activeItems: newactiveItems });
    }
  };

  handleClick = () => {
    this.setState({ viewNotifications: false });
  };

  handleBack = () => {
    this.setState({ viewNotifications: true });
  };

  renderModalHeader = () => {
    const { viewNotifications } = this.state;
    return (
      <div>
        {!viewNotifications
          ? renderArchiveHeader(this.hideModal, this.handleBack)
          : renderNotificationHeader(this.hideModal, this.handleClick)}
      </div>
    );
  };

  /**
   * function to return messages based on the date a message was created
   * @function {@param}
   * @returns
   */
  renderOrder = notifications => {
    const results = {};
    Object.values(notifications).forEach(datum => {
      const ordering = groupedDate(datum.created_at);
      if (!results[ordering]) {
        results[ordering] = [];
      }
      results[ordering].push(datum);
    });
    return results;
  };

  /**
   * function to return icon type
   * @function {@param, @param}
   * @returns
   */
  renderIcons = (notification, notifications) => {
    const { viewNotifications } = this.state;
    const statusImage = {
      src: OffTrackIcon,
      alt: 'offTrack' || 'gteWk5OffTrack'
    };
    const status = !Object.keys(notifications).length
      ? ' '
      : notification.data.status;
    if (status === 'onTrack') {
      statusImage.src = OnTrackIcon;
      statusImage.alt = 'onTrack';
    }
    const message = !Object.keys(notification).length
      ? 'No new notifications yet'
      : notification.data.message;
    return (
      <div className="text-sizing">
        <img
          src={statusImage.src}
          alt={statusImage.alt}
          className="img-padding"
        />
        {viewNotifications
          ? splitDate(notification.created_at)
          : moment(notification.created_at, 'YYYY-MM-DD hh:mm a').format(
              'MMM Do,YYYY - hh:mm a'
            )}
        <br />
        {message}
      </div>
    );
  };

  /**
   * returns thenotification modal
   * @function {@param, @param, @param}
   * @returns
   */
  renderNotificationModal = (ordered, show, unreadnotifications) => (
    <Modal show={show} handleClose={this.hideModal}>
      {this.renderModalHeader()}
      {Object.keys(ordered).map(key => (
        <div className="message-body">
          <div className="message-date" key={key}>
            <span className="left">{key}</span>
            <span
              className="right clear-cursor"
              aria-hidden="true"
              onClick={this.clearNotification}
            >
              Clear All{' '}
            </span>
          </div>
          {ordered[key].map(notification => (
            <div key={notification.id} className="modal-text">
              <div className="message-header">{renderMessageHeader()}</div>
              <div>{this.renderIcons(notification, unreadnotifications)}</div>
            </div>
          ))}
        </div>
      ))}
    </Modal>
  );

  renderArchivesModal = (show, notifications) => (
    <Modal show={show} handleClose={this.hideModal}>
      {this.renderModalHeader()}
      {Object.values(notifications).map(notification => (
        <div className="modal-text text-sizing">
          <div>{this.renderIcons(notification, notifications)}</div>
        </div>
      ))}
    </Modal>
  );

  renderModal = (notifications, unreadnotifications) => {
    const { show, viewNotifications } = this.state;
    const ordered = this.renderOrder(unreadnotifications);
    return (
      <div>
        {viewNotifications &&
          this.renderNotificationModal(ordered, show, unreadnotifications)}
        {!viewNotifications && this.renderArchivesModal(show, notifications)}
      </div>
    );
  };

  render() {
    const { activeItems } = this.state;
    const { user, role, notifications, unreadnotifications } = this.props;
    return (
      <div id="nav" className="header">
        <LogOutModal />
        {this.renderModal(notifications, unreadnotifications)}
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
              onClick={this.showModal}
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
          handleMenuClick={this.handleMenuClick}
          activeItems={activeItems}
        />
      </div>
    );
  }
}
Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  role: PropTypes.string.isRequired,
  getNotification: PropTypes.func.isRequired,
  getUnreadNotification: PropTypes.func.isRequired,
  getReadNotification: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  readnotifications: PropTypes.shape({}).isRequired
};
const mapStateToProps = state => ({
  notifications: state.notification.notification,
  unreadnotifications: state.unreadnotification.unreadnotification,
  readnotifications: state.readnotification.readnotification
});
export const HeaderConnected = connect(
  mapStateToProps,
  {
    getNotification: getFellowNotification,
    getUnreadNotification: getFellowUnreadNotification,
    getReadNotification: getFellowReadNotification
  }
)(Header);
