import React from 'react';
import PropTypes from 'prop-types';
import './Filters.scss';
import Loader from '../Loader/Loader';

export const generateFilterCardId = id =>
  `filterCard-${id.toLowerCase().replace(' ', '')}`;

/**
 *
 * FilterCard Component
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const FilterCard = ({
  className,
  onClick,
  filterId,
  cardDetails,
  dataToggle,
  dataTarget,
  loading
}) => (
  <div
    className={className}
    id={filterId}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
    data-toggle={dataToggle}
    data-target={dataTarget}
  >
    <p className="heading">
      {cardDetails.heading ? cardDetails.heading : cardDetails.title}
    </p>
    <p className="sub">{cardDetails.subTitle}</p>
    <p className="number" id="num">
      {loading ? <Loader size="small" /> : cardDetails.totalFellows}
    </p>
  </div>
);

FilterCard.defaultProps = {
  className: 'filterCard',
  dataTarget: '',
  dataToggle: '',
  loading: false
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
  onClick: PropTypes.func.isRequired,
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  loading: PropTypes.bool
};

export default FilterCard;
