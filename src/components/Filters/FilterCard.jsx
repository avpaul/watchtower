import React from 'react';
import PropTypes from 'prop-types';
import './Filters.css';
/**
 *
 * FilterCard Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const FilterCard = ({ className, onClick, filterId, cardDetails }) => (
  <div
    className={className}
    id={filterId}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
  >
    <p className="title">{cardDetails.title}</p>
    <p className="sub">{cardDetails.subTitle}</p>
    <p className="number">{cardDetails.totalFellows}</p>
  </div>
);

FilterCard.defaultProps = {
  className: 'filterCard'
};

FilterCard.propTypes = {
  className: PropTypes.string,
  cardDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    totalFellows: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired
  }).isRequired,
  filterId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onClick: PropTypes.func.isRequired
};

export default FilterCard;
