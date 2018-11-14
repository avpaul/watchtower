import React from 'react';
import PropTypes from 'prop-types';

const NavArrow = props => {
  const { buttonClass, iconClass, onClick } = props;
  return (
    <div
      role="presentation"
      className={`slick-arrow ${buttonClass}`}
      onClick={onClick}
    >
      <span role="presentation" className={`fa ${iconClass}`} />
    </div>
  );
};

NavArrow.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavArrow;
