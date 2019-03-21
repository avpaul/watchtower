import React from 'react';
import { Link } from 'react-router-dom';
import arrayKey from 'weak-key';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function renderHeader(link, handleMenuClick, isActive, iconImg) {
  const path = link.path ? link.path : '';
  return (
    <Link
      className={classnames(
        'navlink',
        { active: isActive },
        { 'navlink-clickable': path },
        { disabled: !path }
      )}
      data-link-key={link.key}
      onClick={handleMenuClick}
      to={{ pathname: path }}
      onKeyPress={handleMenuClick}
    >
      <span className="navicon">
        <img
          className={`${link.key}__icon`}
          src={iconImg}
          alt={`${link.key}Icon`}
        />
      </span>
      {link.name}
    </Link>
  );
}

/**
 *
 * MenuLink Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const MenuLink = props => {
  // if the link state is active, change icon
  const { link, handleMenuClick, isActive, role } = props;
  const iconImg = isActive ? link.activeIcon : link.icon;

  return (
    <div className="menulink">
      {renderHeader(link, handleMenuClick, isActive, iconImg)}
      {link.dropdown !== undefined && role !== 'Fellow' && (
        <div>
          <div className="nav-link dropdown-toggle" data-toggle="dropdown">
            <div className="dropdown-menu dropdown-menu-right">
              {link.dropdown.map((item, index) => (
                <a
                  key={arrayKey({ item, index })}
                  className="dropdown-item"
                  href="/"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MenuLink.propTypes = {
  link: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node
  }).isRequired,
  isActive: PropTypes.bool,
  handleMenuClick: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
};

MenuLink.defaultProps = {
  isActive: false
};

export default MenuLink;
