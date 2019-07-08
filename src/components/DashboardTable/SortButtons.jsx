import React from 'react';
import PropTypes from 'prop-types';
import './SortButtons.scss';

const SortButtons = ({
  arrowUpClick,
  arrowDownClick,
  headerName,
  active,
  sortType
}) => {
  const arrowClass = 'fas align-self-center';
  const arrowUpClass = `${arrowClass} fa-angle-up ${
    active && sortType === 'ascending' ? 'text-primary' : ''
  }`;
  const arrowDownClass = `${arrowClass} fa-angle-down ${
    active && sortType === 'descending' ? 'text-primary' : ''
  }`;

  return (
    <span className="sort-buttons ml-3 p-0 text-left">
      <div className="sort-buttons__up p-0">
        <i
          className={arrowUpClass}
          onClick={arrowUpClick}
          onKeyPress={arrowUpClick}
          role="button"
          tabIndex="0"
          data-target={headerName}
          data-ascending
        />
      </div>
      <div className="sort-buttons__down p-0">
        <i
          className={arrowDownClass}
          onClick={arrowDownClick}
          onKeyPress={arrowDownClick}
          role="button"
          tabIndex="-1"
          data-target={headerName}
        />
      </div>
    </span>
  );
};

SortButtons.propTypes = {
  arrowUpClick: PropTypes.func.isRequired,
  arrowDownClick: PropTypes.func.isRequired,
  headerName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired
};

export default SortButtons;
