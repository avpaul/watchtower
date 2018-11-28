import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapValues from 'lodash.mapvalues';
import PropTypes from 'prop-types';
import './Header.css';
import Menu from './Menu';
import { getMenuItems } from './navlinks';
import watchTowerLogo from '../../static/Logo.svg';
import notificationIcon from '../../static/Notification.svg';
import LogOutModal from '../LogOutModal/LogOutModal';
import truncate from '../../utils';
import OffTrackIcon from '../../static/OffTrack.svg';
import OnTrackIcon from '../../static/OnTrack.svg';
import searchIcon from '../../static/Loupe.svg';
import { Modal } from '../Notifications/Modal';
import { splitDate, groupedDate } from '../../services/helper';

import fellows from '../../__mocks__/Dummy';

/**
 * Header UI Component
 *
 * @returns {JSX} React component
 */

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeItems: {
        fellows: true,
        dashboard: true,
        settings: false
      },
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleMenuClick = e => {
    const key = e.target.dataset.linkKey;
    const { activeItems } = this.state;
    if (!activeItems[key]) {
      const newactiveItems = mapValues(activeItems, () => false);
      newactiveItems[key] = true;
      this.setState({ activeItems: newactiveItems });
    }
  };

  renderNotification = () => {
    fellows.map(fellow => <div key={fellow.id}>{fellow.firstName}</div>);
  };

  renderModalHeader = () => (
    <div className="handle-close">
      <button
        type="button"
        className="close"
        onClick={this.hideModal}
        aria-label="Close"
      >
        <span aria-hidden="true">
          <b>&times;</b>
        </span>
      </button>
      <div className="modal-notification">
        <b>Notifications</b>
        <span className="clear">View Archives</span>
      </div>
    </div>
  );

  /**
   * function to return messages based on the date a message was created
   * @function {@param}
   * @return
   */
  renderOrder = () => {
    const results = {};
    fellows.forEach(datum => {
      const ordering = groupedDate(datum.created_at);
      if (!results[ordering]) {
        results[ordering] = [];
      }
      results[ordering].push(datum);
    });
    return results;
  };

  /**
   * function to return the message header
   * @function
   */
  renderMessageHeader = () => (
    <div>
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="false">&times;</span>
      </button>
    </div>
  );

  renderIcons = notification => {
    const statusImage = {
      src: OffTrackIcon,
      alt: 'offTrack'
    };
    if (notification.data.status === 'onTrack') {
      statusImage.src = OnTrackIcon;
      statusImage.alt = 'onTrack';
    }
    return (
      <div className="text-sizing">
        <img src={statusImage.src} alt={statusImage.alt} />
        {splitDate('2018-10-29 14:34:03')} <br />
        {notification.data.message}
      </div>
    );
  };

  /**
   * function that returns the modal containing the rendered messages.
   * @function
   */
  renderModal = () => {
    const { show } = this.state;
    const ordered = this.renderOrder();
    return (
      <Modal show={show} handleClose={this.hideModal} fellows={fellows}>
        {this.renderModalHeader()}
        {Object.keys(ordered).map(key => (
          <div className="message-body">
            <div className="message-date" key={key}>
              <span className="left">{key}</span>
              <span className="right">Clear All </span>
            </div>
            {ordered[key].map(notification => (
              <div key={notification.id} className="modal-text">
                <div className="message-header">
                  {this.renderMessageHeader()}
                </div>
                <div>{this.renderIcons(notification)}</div>
              </div>
            ))}
          </div>
        ))}
      </Modal>
    );
  };

  render() {
    const { activeItems } = this.state;
    const { user, role } = this.props;
    return (
      <div id="nav" className="header">
        <LogOutModal />
        {this.renderModal()}
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
            <div
              id="search-icon"
              data-toggle="collapse"
              data-target="#search_form"
            >
              <img
                className="search__icon d-inline-block d-sm-none"
                src={searchIcon}
                alt="searchIcon"
              />
            </div>
            <div id="search_form" className="inner-addon collapse show">
              <input
                type="search"
                className="form-control fellow-search"
                name="fellow_search_query"
              />
            </div>
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
              <i className="notification__icon" />
            </span>
            <div id="profile-menu" className="dropdown">
              <div
                className="d-flex flex-row align-items-center pr-5 .dropdown-toggle"
                data-toggle="dropdown"
              >
                <div className="d-flex pr-3 align-items-center">
                  <img className="user__image" src={user.picture} alt="User" />
                  <span className="user__text d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">
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
  role: PropTypes.string.isRequired
};

export default Header;
