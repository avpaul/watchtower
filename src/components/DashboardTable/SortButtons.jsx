import React from 'react';
import PropTypes from 'prop-types';
import './SortButtons.css';

const SortButtons = ({
  arrowUpClick,
  arrowDownClick,
  headerName,
  active,
  sortType
}) => {
  const arrowUpClass =
    active && sortType === 'descending'
      ? 'fas fa-angle-up col-6 text-primary'
      : 'fas fa-angle-up col-6';
  const arrowDownClass =
    active && sortType === 'ascending'
      ? 'fas fa-angle-down col-6 text-primary'
      : 'fas fa-angle-down col-6';

  return (
    <span className=" ml-1 sort-buttons row p-0 text-left">
      <div className="col-12 p-0">
        <i
          className={arrowUpClass}
          onClick={arrowUpClick}
          onKeyPress={arrowUpClick}
          role="button"
          tabIndex="0"
          data-target={headerName}
        />
      </div>
      <div className="col-12 p-0">
        <i
          className={arrowDownClass}
          onClick={arrowDownClick}
          onKeyPress={arrowDownClick}
          role="button"
          tabIndex="0"
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
