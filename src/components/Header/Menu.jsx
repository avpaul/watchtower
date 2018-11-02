import React from 'react';
import PropTypes from 'prop-types';
import MenuLink from './MenuLink';

/**
 *
 * Menu Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const Menu = ({
  items, handleMenuClick, activeItems, role,
}) => (
  <div className="header--bottom d-flex justify-content-center">
    {items.map(
      item => (
        <MenuLink
          role={role}
          key={item.key}
          link={item}
          handleMenuClick={handleMenuClick}
          isActive={activeItems[item.key]}
        />
      ),
    )
    }
  </div>
);

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  role: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  activeItems: PropTypes.shape({
    fellows: PropTypes.bool.isRequired,
    settings: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Menu;
