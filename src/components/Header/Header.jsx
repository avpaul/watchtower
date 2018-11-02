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
        settings: false,
      },
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e) {
    e.preventDefault();
    const key = e.target.dataset.linkKey;
    const { activeItems } = this.state;
    if (!activeItems[key]) {
      const newactiveItems = mapValues(activeItems, () => false);
      newactiveItems[key] = true;
      this.setState({ activeItems: newactiveItems });
    }
  }

  render() {
    const { activeItems } = this.state;
    const { user, role } = this.props;
    return (
      <div id="nav" className="header">
        <LogOutModal />
        <div className="navbar navbar-expand flex-row m-0 px-5 py-3 justify-content-between">
          <Link to="/dashboard" className="logo">
            <img className="watch-tower__logo" src={watchTowerLogo} alt="watch tower logo" />
            <span className="watch-tower d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">WatchTower</span>
          </Link>
          <div className="d-flex flex-row">
            <div className="notification">
              <img className="notification__icon" src={notificationIcon} alt="notificationIcon" />
              <i className="notification__icon" />
            </div>
            <div id="profile-menu" className="dropdown">
              <div className="d-flex flex-row align-items-center pr-5 .dropdown-toggle" data-toggle="dropdown">
                <div className="d-flex pr-3 align-items-center">
                  <img className="user__image" src={user.picture} alt="User" />
                  <span className="user__text d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">{ truncate(user.name, 14) }</span>
                </div>
                <i className="fas fa-caret-down header__dropdown" />
              </div>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" data-toggle="modal" data-target="#logout-modal" href="/">Log out</a>
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
    picture: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default Header;
