import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 *
 * MenuLink Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const MenuLink = ({ link, handleMenuClick, isActive, role }) => {
  // if the link state is active, change icon
  let iconImg = link.icon;
  if (isActive) {
    iconImg = link.activeIcon || link.icon;
  }

  function renderHeader() {
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

  if (role === 'Fellow') {
    return <div className="menulink">{renderHeader()}</div>;
  }

  if (
    role === 'WATCH_TOWER_OPS' ||
    'WATCH_TOWER_EM' ||
    'WATCH_TOWER_TTL' ||
    'WATCH_TOWER_LF'
  ) {
    return (
      <div className="menulink">
        {renderHeader()}
        {link.dropdown !== undefined && (
          <div>
            <a
              className="nav-link dropdown-toggle"
              href="/"
              data-toggle="dropdown"
            >
              <div className="dropdown-menu dropdown-menu-right">
                {link.dropdown.map(item => (
                  <a key={item.id} className="dropdown-item" href="/">
                    {item}
                  </a>
                ))}
              </div>
            </a>
          </div>
        )}
      </div>
    );
  }
  return null;
};

MenuLink.propTypes = {
  link: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node
  }).isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired
};

export default MenuLink;
