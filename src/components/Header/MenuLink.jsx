import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * MenuLink Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const MenuLink = ({
  link, handleMenuClick, isActive, role,
}) => {
  let active = '';
  // if the link state is active, change icon

  if (isActive) {
    active = 'active';
  }

  function renderHeader() {
    return (
      <div
        className={`navlink ${active}`}
        data-link-key={link.key}
        onClick={handleMenuClick}
        to={link.path}
        role="link"
        onKeyPress={handleMenuClick}
        tabIndex="0"
      >
        {link.name}
      </div>
    );
  }

  if (role === 'Fellow') {
    return (
      <div className="menulink">
        {(renderHeader())}
      </div>
    );
  }


  if (role === 'WATCH_TOWER_OPS' || 'WATCH_TOWER_EM' || 'WATCH_TOWER_TTL' || 'WATCH_TOWER_LF') {
    return (
      <div className="menulink">
        {(renderHeader())}
        {link.dropdown !== undefined
          && (
          <div>
            <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown">
              <div className="dropdown-menu dropdown-menu-right">
                {link.dropdown.map(
                  item => (
                    <a className="dropdown-item" href="/">{item}</a>
                  ),
                )}
              </div>
            </a>
          </div>
          )
          }
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
    activeIcon: PropTypes.node,
  }).isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

export default MenuLink;
