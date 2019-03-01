import React, { Component } from 'react';
import mapValues from 'lodash.mapvalues';
import PropTypes from 'prop-types';
import './Header.css';
import { connect } from 'react-redux';
import moment from 'moment';
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
import getLfNotifications from '../../redux/actionCreators/lfNotificationAction';
import getTtlNotifications from '../../redux/actionCreators/ttlNotificationActions';
import updateManagerNotification from '../../redux/actionCreators/managerNotificationReadActions';
import FellowHeader from './FellowHeader';
import ManagerHeader from './ManagerHeader';

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
        fellows: false,
        dashboard: false,
        developers: false,
        settings: false
      },
      show: false,
      viewNotifications: true
    };
  }

  componentDidMount() {
    const { role, location } = this.props;
    this.switchNotificationsType(role);

    switch (location.pathname) {
      case '/dashboard':
        this.setState({ activeItems: { dashboard: true } });
        break;
      case '/dashboard/fellows':
        this.setState({ activeItems: { developers: true } });
        break;
      default: {
        if (location.pathname.search('/dashboard/fellow/') === 0) {
          this.setState({ activeItems: { developers: true } });
        }
      }
    }
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

  clearManagerNotification = () => {
    const { user, getTtlNotification } = this.props;
    getTtlNotification(user.email);
  };

  displayManagerNotification = notification => {
    if (!notification) {
      return (
        <div className="modal-text text-sizing">
          <p>No new notifications yet</p>
        </div>
      );
    }

    const { id } = notification;
    const { updateNotificationAsRead } = this.props;
    const { onTrack, offTrack, pip } = notification.manager;
    updateNotificationAsRead(id);
    return (
      <div>
        <div className="message-body">
          <div className="message-date" key="date here">
            <span className="left">
              {groupedDate(notification.createdAt.date)}
            </span>
            <span
              className="right clear-cursor"
              aria-hidden="true"
              onClick={this.clearManagerNotification}
            >
              Clear All{' '}
            </span>
          </div>
        </div>
        <div className="modal-text text-sizing">
          <img
            src={
              !onTrack.includes('0 of your Fellows')
                ? OnTrackIcon
                : OffTrackIcon
            }
            alt="Notification Archives"
            className="img-padding"
          />
          {onTrack}
        </div>
        <div className="modal-text text-sizing">
          <img
            src={
              offTrack.includes('0 of your Fellows')
                ? OnTrackIcon
                : OffTrackIcon
            }
            alt="Notification Archives"
            className="img-padding"
          />
          {offTrack}
        </div>
        <div className="modal-text text-sizing">
          <img
            src={pip.includes('0 of your Fellows') ? OnTrackIcon : OffTrackIcon}
            alt="Notification Archives"
            className="img-padding"
          />
          {pip}
        </div>
      </div>
    );
  };

  managerArchiveModal = notification => {
    if (notification.readAt) {
      const { onTrack, offTrack, pip } = notification.manager;
      return (
        <div>
          <div className="message-date" key="date here">
            <span className="left">
              {groupedDate(notification.readAt.date)}
            </span>
          </div>
          <div className="modal-text text-sizing">
            <img
              src={
                !onTrack.includes('0 of your Fellows')
                  ? OnTrackIcon
                  : OffTrackIcon
              }
              alt="Notification Archives"
              className="img-padding"
            />
            {onTrack}
          </div>
          <div className="modal-text text-sizing">
            <img
              src={
                offTrack.includes('0 of your Fellows')
                  ? OnTrackIcon
                  : OffTrackIcon
              }
              alt="Notification Archives"
              className="img-padding"
            />
            {offTrack}
          </div>
          <div className="modal-text text-sizing">
            <img
              src={
                pip.includes('0 of your Fellows') ? OnTrackIcon : OffTrackIcon
              }
              alt="Notification Archives"
              className="img-padding"
            />
            {pip}
          </div>
        </div>
      );
    }
    return null;
  };

  renderManagerArchivesModal = (show, notification) => (
    <Modal show={show} handleClose={this.hideModal}>
      {this.renderModalHeader()}
      {Object.values(notification).map(notify => (
        <div>{this.managerArchiveModal(notify)}</div>
      ))}
    </Modal>
  );

  displayNotificationModal = (show, notification) => {
    const unreadNotifications = notification.filter(notif => !notif.readAt);
    if (!unreadNotifications.length) {
      return (
        <Modal show={show} handleClose={this.hideModal}>
          {this.renderModalHeader()}
          {this.displayManagerNotification(null)}
        </Modal>
      );
    }

    return (
      <Modal show={show} handleClose={this.hideModal}>
        {this.renderModalHeader()}
        {unreadNotifications.map(notify => (
          <div>{this.displayManagerNotification(notify)}</div>
        ))}
      </Modal>
    );
  };

  renderManagerModal = notification => {
    const { show, viewNotifications } = this.state;

    return (
      <div>
        {viewNotifications && this.displayNotificationModal(show, notification)}
        {!viewNotifications &&
          this.renderManagerArchivesModal(show, notification)}
      </div>
    );
  };

  switchNotificationsType = role => {
    const {
      user,
      getNotification,
      getUnreadNotification,
      getLfNotification,
      getTtlNotification
    } = this.props;
    switch (role) {
      case 'Fellow':
        getNotification(user.email);
        getUnreadNotification(user.email);
        break;
      case 'WATCH_TOWER_LF':
        getLfNotification(user.email);
        break;
      case 'WATCH_TOWER_TTL':
        getTtlNotification(user.email);
        break;
      default:
        return null;
    }
    return null;
  };

  switchHeader = userRole => {
    const { activeItems } = this.state;
    const {
      user,
      role,
      notifications,
      unreadnotifications,
      ttlNotification,
      lfNotification
    } = this.props;
    const managerNotification = !ttlNotification
      ? lfNotification
      : ttlNotification;
    const unreadManagerNotification = managerNotification.filter(
      notif => !notif.readAt
    );

    switch (userRole) {
      case 'WATCH_TOWER_LF':
        return (
          <ManagerHeader
            renderManagerModal={this.renderManagerModal}
            showModal={this.showModal}
            handleMenuClick={this.handleMenuClick}
            activeItems={activeItems}
            notifications={lfNotification}
            unreadnotifications={unreadManagerNotification}
            user={user}
            role={role}
          />
        );

      case 'WATCH_TOWER_TTL':
        return (
          <ManagerHeader
            renderManagerModal={this.renderManagerModal}
            showModal={this.showModal}
            handleMenuClick={this.handleMenuClick}
            activeItems={activeItems}
            notifications={ttlNotification}
            unreadnotifications={unreadManagerNotification}
            user={user}
            role={role}
          />
        );

      default:
        return (
          <FellowHeader
            renderModal={this.renderModal}
            showModal={this.showModal}
            handleMenuClick={this.handleMenuClick}
            activeItems={activeItems}
            notifications={notifications}
            unreadnotifications={unreadnotifications}
            user={user}
            role={role}
          />
        );
    }
  };

  render() {
    const { role } = this.props;
    return <div>{this.switchHeader(role)}</div>;
  }
}
Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  getNotification: PropTypes.func.isRequired,
  getUnreadNotification: PropTypes.func.isRequired,
  getReadNotification: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  readnotifications: PropTypes.shape({}).isRequired,
  getTtlNotification: PropTypes.func.isRequired,
  updateNotificationAsRead: PropTypes.func.isRequired,
  getLfNotification: PropTypes.func.isRequired,
  ttlNotification: PropTypes.func.isRequired,
  lfNotification: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  notifications: state.notification.notification,
  unreadnotifications: state.unreadnotification.unreadnotification,
  readnotifications: state.readnotification.readnotification,
  ttlNotification: state.ttlNotification.ttlNotification,
  lfNotification: state.lfNotification.lfNotification
});
export const HeaderConnected = connect(
  mapStateToProps,
  {
    getNotification: getFellowNotification,
    getUnreadNotification: getFellowUnreadNotification,
    getReadNotification: getFellowReadNotification,
    getLfNotification: getLfNotifications,
    getTtlNotification: getTtlNotifications,
    updateNotificationAsRead: updateManagerNotification
  }
)(Header);
