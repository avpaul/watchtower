import React from 'react';
import PropTypes from 'prop-types';
import {
  tmSubmenus,
  opsSubmenus,
  cardBorderStyle,
  titleStyle,
  subtitleStyle,
  badgeStyle
} from './cadreUtils';

/**
 * Displays the icon of a card
 * @param  {string} submenu    [description]
 * @param  {string} activeItem [description]
 * @return {html} Returns a html element of (div) tag
 */
const icon = (submenu, activeItem) => (
  <div
    data-key={submenu.id}
    className="project-badge"
    style={activeItem === submenu.id ? badgeStyle : {}}
  >
    <img
      className="iconImage"
      src={activeItem === submenu.id ? submenu.activeIcon : submenu.icon}
      alt={`${submenu.icon}_icon`}
    />
  </div>
);

/**
 * Displays the title of a card
 * @param  {string} submenu    [description]
 * @param  {string} activeItem [description]
 * @return {html} Returns a html element of (div) tag
 */
const title = (submenu, activeItem) => (
  <div data-key={submenu.id}>
    <p
      data-key={submenu.id}
      style={activeItem === submenu.id ? titleStyle : {}}
      className="submenu-title"
    >
      {submenu.title}
    </p>
  </div>
);

/**
 * Displays the subtitle of a card
 * @param  {string} submenu    [description]
 * @param  {string} activeItem [description]
 * @return {html} Returns a html element of (p) tag
 */
const subtitle = (submenu, activeItem) => (
  <p
    data-key={submenu.id}
    className="submenu-subtitle"
    style={activeItem === submenu.id ? subtitleStyle : {}}
  >
    {submenu.subtitle}
  </p>
);

/**
 * Displays the subtitle of a card
 * @param  {string} submenu    [description]
 * @param  {string} handleCardclick [description]
 * @param  {string} activeItem [description]
 * @return {html} Returns a html element of (li) tag
 */
const subMenueItem = (submenu, handleCardclick, activeItem) => (
  <li className="brand-nav active">
    <div
      role="presentation"
      data-key={submenu.id}
      className="cadre-submenu-cards"
      onClick={handleCardclick}
      onKeyPress={handleCardclick}
      id={submenu.id}
      style={activeItem === submenu.id ? cardBorderStyle : {}}
    >
      <div data-key={submenu.id} className="cards-header row m-0">
        {icon(submenu, activeItem)}
        {title(submenu, activeItem)}
      </div>
      {subtitle(submenu, activeItem)}
    </div>
  </li>
);

const mapSubMenuItem = (userSubMenu, handleCardclick, activeItem) => (
  <ul className="nav nav-pills nav-stacked">
    {userSubMenu.map(submenu =>
      subMenueItem(submenu, handleCardclick, activeItem)
    )}
  </ul>
);

/**
 * This method maps through the submenu
 * array of objects data structure
 * and displays the corresponding data
 * @param {Object} props
 */
const CadreSubmenu = props => {
  const { handleCardclick, activeItem, submenuType } = props;

  switch (submenuType) {
    case 'opsSubmenus':
      return mapSubMenuItem(opsSubmenus, handleCardclick, activeItem);
    case 'tmSubmenus':
      return mapSubMenuItem(tmSubmenus, handleCardclick, activeItem);
    default:
      return null;
  }
};

CadreSubmenu.propTypes = {
  handleCardclick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  submenuType: PropTypes.string.isRequired
};

export default CadreSubmenu;
