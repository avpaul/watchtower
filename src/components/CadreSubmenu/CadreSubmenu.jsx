import React from 'react';
import PropTypes from 'prop-types';
import {
  submenus,
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
 * This method maps through the submenu
 * array of objects data structure
 * and displays the corresponding data
 * @param {Object} props
 */
const CadreSubmenu = props => {
  const { handleCardclick, activeItem } = props;
  return (
    <ul className="nav nav-pills nav-stacked">
      {submenus.map(submenu => (
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
      ))}
    </ul>
  );
};

CadreSubmenu.propTypes = {
  handleCardclick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};

export default CadreSubmenu;
