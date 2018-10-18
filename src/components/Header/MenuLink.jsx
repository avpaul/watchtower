import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * MenuLink Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const MenuLink = ({ link, handleMenuClick, isActive }) => {
  let active = '';
  let iconImg = link.icon;
  // if the link state is active, change icon
  if (isActive) {
    active = 'active';
    iconImg = link.activeIcon || link.icon;
  }
  return (
    <div className="menulink">
      <div
        className={`navlink ${active}`}
        data-link-key={link.key}
        onClick={handleMenuClick}
        to={link.path}
        role="link"
        onKeyPress={handleMenuClick}
        tabIndex="0"
      >
        <span className="navicon">
          <img className={`${link.key}__icon`} src={iconImg} alt={`${link.key}Icon`} />
        </span>
        {link.name}
      </div>
    </div>
  );
};

MenuLink.propTypes = {
  link: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node,
  }).isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default MenuLink;
