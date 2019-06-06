import React, { Component } from 'react';
import mapValues from 'lodash.mapvalues';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import './Header.css';
import { connect } from 'react-redux';
import moment from 'moment';
import OffTrackIcon from '../../static/OffTrack.svg';
import OnTrackIcon from '../../static/OnTrack.svg';
import { Modal } from '../Notifications/Modal';
import { splitDate, groupedDate } from '../../services/helper';
import getReadNotifications from '../../redux/actionCreators/getReadNotifications';
import getUnreadNotifications from '../../redux/actionCreators/getUnreadNotifications';
import markNotificationAsRead from '../../redux/actionCreators/markNotificationsAsRead';
import renderArchiveHeader from '../Notifications/ArchiveHeader';
import renderNotificationHeader from '../Notifications/NotificationHeader';
import renderMessageHeader from '../Notifications/MessageHeader';
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
        performance: false,
        feedback: false,
        settings: false,
        cadre: false
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
      case '/developers':
        this.setState({ activeItems: { developers: true } });
        break;
      case '/performance':
        this.setState({ activeItems: { performance: true } });
        break;
      case '/feedback':
        this.setState({ activeItems: { feedback: true } });
        break;
      case '/cadre':
        this.setState({ activeItems: { cadre: true } });
        break;
      default: {
        if (location.pathname.search('/developers/') === 0) {
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

  clearNotification = notificationId => {
    const { markNotificationsAsRead, getUnreadNotification } = this.props;
    markNotificationsAsRead(notificationId).then(() => getUnreadNotification());
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
    const { getNotification } = this.props;
    this.setState({ viewNotifications: false });
    getNotification();
  };

  handleBack = () => {
    const { getUnreadNotification } = this.props;
    this.setState({ viewNotifications: true });
    getUnreadNotification();
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
  renderIcons = notification => {
    const { viewNotifications } = this.state;
    const statusImage = {
      src: OffTrackIcon,
      alt: 'offTrack' || 'gteWk5OffTrack'
    };
    if (notification.data.includes('on track')) {
      statusImage.src = OnTrackIcon;
      statusImage.alt = 'onTrack';
    }
    const message = !Object.keys(notification).length
      ? 'No new notifications yet'
      : notification.data;
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
        {message.split('\\').join('')}
      </div>
    );
  };

  /**
   * returns thenotification modal
   * @function {@param, @param, @param}
   * @returns
   */
  renderNotificationModal = (ordered, show, unreadnotifications) => {
    const { loading } = this.props;
    if (show && !unreadnotifications.length) {
      return (
        <Modal show={show} handleClose={this.hideModal}>
          {this.renderModalHeader()}
          <div className="modal-text text-sizing">
            <p>No new notifications yet</p>
          </div>
        </Modal>
      );
    }
    return (
      <Modal show={show} handleClose={this.hideModal}>
        {this.renderModalHeader()}
        {Object.keys(ordered).map((key, index) => (
          <div className="message-body" key={arrayKey({ key, index })}>
            <div className="message-date" key={key}>
              <span className="left">{key}</span>
              <span
                className="right clear-cursor"
                aria-hidden="true"
                onClick={() => this.clearNotification('all')}
              >
                {loading ? 'Loading' : 'Clear All'}
              </span>
            </div>
            {ordered[key].map(notification => (
              <div key={notification.id} className="modal-text">
                <div
                  className="message-header"
                  onClick={() => this.clearNotification(notification.id)}
                  role="presentation"
                >
                  {renderMessageHeader()}
                </div>
                <div>{this.renderIcons(notification)}</div>
              </div>
            ))}
          </div>
        ))}
      </Modal>
    );
  };

  renderArchivesModal = (show, notifications) => (
    <Modal show={show} handleClose={this.hideModal}>
      {this.renderModalHeader()}
      {Object.values(notifications).map((notification, index) => (
        <div
          className="modal-text text-sizing"
          key={arrayKey({ notification, index })}
        >
          <div>{this.renderIcons(notification)}</div>
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

  renderNotificationIcon = trackStatus => (
    <div className="modal-text text-sizing">
      <img
        src={trackStatus.includes('On Track') ? OnTrackIcon : OffTrackIcon}
        alt="Notification Archives"
        className="img-padding"
      />
      {trackStatus}
    </div>
  );

  displayManagerNotification = notification => {
    const { loading } = this.props;
    if (!notification) {
      return (
        <div className="modal-text text-sizing">
          <p>No new notifications yet</p>
        </div>
      );
    }
    const { onTrack, offTrack, pip } = JSON.parse(notification.data);
    return (
      <div>
        <div className="message-body">
          <div className="message-date" key="date here">
            <span className="left">{groupedDate(notification.created_at)}</span>
            <span
              className="right clear-cursor"
              aria-hidden="true"
              onClick={() => this.clearNotification(notification.id)}
            >
              {loading ? 'Loading' : 'Clear All'}
            </span>
          </div>
        </div>
        {this.renderNotificationIcon(onTrack)}
        {this.renderNotificationIcon(offTrack)}
        {this.renderNotificationIcon(pip)}
      </div>
    );
  };

  managerArchiveModal = notification => {
    if (notification.created_at) {
      const { onTrack, offTrack, pip } = JSON.parse(notification.data);
      return (
        <div>
          <div className="message-date" key="date here">
            <span className="left">{groupedDate(notification.created_at)}</span>
          </div>
          {this.renderNotificationIcon(onTrack)}
          {this.renderNotificationIcon(offTrack)}
          {this.renderNotificationIcon(pip)}
        </div>
      );
    }
    return null;
  };

  renderNotifications = (notifications, show, modalAction) => (
    <Modal show={show} handleClose={this.hideModal}>
      {this.renderModalHeader()}
      {notifications.map((notify, index) => (
        <div key={arrayKey({ notify, index })}>{this[modalAction](notify)}</div>
      ))}
    </Modal>
  );

  renderManagerArchivesModal = (show, notification) =>
    this.renderNotifications(
      Object.values(notification),
      show,
      'managerArchiveModal'
    );

  displayNotificationModal = (show, unreadNotifications) => {
    if (!unreadNotifications.length) {
      return (
        <Modal show={show} handleClose={this.hideModal}>
          {this.renderModalHeader()}
          {this.displayManagerNotification(null)}
        </Modal>
      );
    }

    return this.renderNotifications(
      unreadNotifications,
      show,
      'displayManagerNotification'
    );
  };

  renderManagerModal = (notification, unreadNotifications) => {
    const { show, viewNotifications } = this.state;

    return (
      <div>
        {viewNotifications &&
          this.displayNotificationModal(show, unreadNotifications)}
        {!viewNotifications &&
          this.renderManagerArchivesModal(show, notification)}
      </div>
    );
  };

  switchNotificationsType = role => {
    const { getUnreadNotification } = this.props;
    switch (role) {
      case 'Fellow':
        getUnreadNotification();
        break;
      case 'WATCH_TOWER_LF':
        getUnreadNotification();
        break;
      case 'WATCH_TOWER_TTL':
      case 'WATCH_TOWER_EM':
      case 'WATCH_TOWER_SL':
        getUnreadNotification();
        break;
      default:
        return null;
    }
    return null;
  };

  switchHeader = userRole => {
    const { activeItems } = this.state;
    const { user, role, notifications, unreadnotifications } = this.props;

    switch (userRole) {
      case 'WATCH_TOWER_LF':
      case 'WATCH_TOWER_TTL':
      case 'WATCH_TOWER_EM':
      case 'WATCH_TOWER_SL':
        return (
          <ManagerHeader
            renderManagerModal={this.renderManagerModal}
            showModal={this.showModal}
            handleMenuClick={this.handleMenuClick}
            activeItems={activeItems}
            notifications={notifications}
            unreadnotifications={unreadnotifications || []}
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
            unreadnotifications={unreadnotifications || []}
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
  markNotificationsAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.instanceOf(Array).isRequired,
  unreadnotifications: PropTypes.shape({}).isRequired,
  readnotifications: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  loading: state.readnotification.loading,
  notifications: state.notification.notification,
  unreadnotifications: state.unreadnotification.unreadnotification,
  readnotifications: state.readnotification.readnotification
});
export default connect(
  mapStateToProps,
  {
    getNotification: getReadNotifications,
    getUnreadNotification: getUnreadNotifications,
    markNotificationsAsRead: markNotificationAsRead
  }
)(Header);
