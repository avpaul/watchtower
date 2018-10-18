import React, { Component } from 'react';
import mapValues from 'lodash.mapvalues';
import './Header.css';
import Menu from './Menu';
import items from './navlinks';
import watchTowerLogo from '../../static/Logo.svg';
import defaultUserPic from '../../static/Upic.svg';
import notificationIcon from '../../static/Notification.svg';
import searchIcon from '../../static/Loupe.svg';

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
    return (
      <div id="nav" className="header">
        <div className="navbar navbar-expand flex-row m-0 px-5 py-3 justify-content-between">
          <a href="#default" className="logo">
            <img className="watch-tower__logo" src={watchTowerLogo} alt="watch tower logo" />
            <span className="watch-tower d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">WatchTower</span>
          </a>
          <div className="d-flex flex-row">
            <div id="search-icon" data-toggle="collapse" data-target="#search_form">
              <img className="search__icon d-inline-block d-md-none d-xl-none" src={searchIcon} alt="searchIcon" />
            </div>
            <div id="search_form" className="inner-addon collapse show">
              <img className="search__icon d-none d-md-inline-block d-xl-inline-block" src={searchIcon} alt="searchIcon" />
              <input type="search" className="form-control fellow-search" name="fellow_search_query" />
            </div>
            <div className="notification">
              <img className="notification__icon" src={notificationIcon} alt="notificationIcon" />
              <i className="notification__icon" />
            </div>
            <div id="profile-menu" className="dropdown">
              <div className="d-flex flex-row align-items-center pr-5 .dropdown-toggle" data-toggle="dropdown">
                <img className="user__image" src={defaultUserPic} alt="defaultUserPic" />
                <span className="user__text d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">Silm Momoh</span>
                <i className="fas fa-caret-down header__dropdown" />
              </div>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/">Profile</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="/">Log out</a>
              </div>
            </div>
          </div>
        </div>
        <hr className="header__divider" />
        <Menu items={items} handleMenuClick={this.handleMenuClick} activeItems={activeItems} />
      </div>
    );
  }
}

export default Header;
