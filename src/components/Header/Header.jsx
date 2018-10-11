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
      <div className="header">
        <div className="header--top row">
          <a href="#default" className="logo col-md-7">
            <img className="watch-tower__logo" src={watchTowerLogo} alt="watch tower logo" />
            <span className="watch-tower">WatchTower</span>
          </a>
          <div className="inner-addon right-addon">
            <img className="search__icon" src={searchIcon} alt="searchIcon" />
            <input type="search" className="form-control fellow-search" name="fellow_search_query" />
          </div>
          <div className="notification">
            <img className="notification__icon" src={notificationIcon} alt="notificationIcon" />
            <i className="notification__icon" />
          </div>
          <div className="user">
            <img className="user__image" src={defaultUserPic} alt="defaultUserPic" />
            <span className="user__text">Silm Momoh</span>
          </div>
          <i className="fas fa-caret-down header__dropdown" />
        </div>
        <hr className="header__divider" />
        <div className="header--bottom">
          <Menu items={items} handleMenuClick={this.handleMenuClick} activeItems={activeItems} />
        </div>
      </div>
    );
  }
}

export default Header;
