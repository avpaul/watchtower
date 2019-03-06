import React from 'react';
import PropTypes from 'prop-types';
import check from '../../static/check-mark.svg';

/**
 * @method FellowFilterCard
 * @summary Method to render fellow's cards that can be filtered
 * @param { cardName {string},
 * numberOfFellows { number }, isTicked {object - Project|status},
 * handleClick { function }, filterKey {string} } param0 {Object}
 * @returns A rendered version of a clickable fellows card with the name, number of fellows,
 * whether the card should be ticked and a key to be filtered by.
 */
const FellowFilterCard = ({
  cardName,
  numberOfFellows,
  isTicked,
  handleCardClick,
  filterKey
}) => (
  <div
    className="fellow-summary-card fellow-filter-card mt-4"
    id={cardName}
    filterKey={filterKey}
    onClick={handleCardClick}
    onKeyPress={handleCardClick}
    role="button"
    tabIndex="0"
  >
    <div className="">
      <img
        className="img-responsive rounded-circle checkmark float-right"
        style={{
          display:
            isTicked.project === cardName || isTicked.status === cardName
              ? 'block'
              : 'none'
        }}
        src={check}
        alt=""
      />
    </div>
    <div className="float-left left mt-3 card-name">{cardName}</div>
    <div className="float-right right mt-3 card-number-display">
      {numberOfFellows}
    </div>
  </div>
);

/**
 * @name FellowFilterCard Proptypes
 * @type (Proptypes)
 * @property cardName - String
 * @property numberOfFellow - number
 * @property handleCardClick - function
 * @property filterKey - string
 */
FellowFilterCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  numberOfFellows: PropTypes.number.isRequired,
  isTicked: PropTypes.bool.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  filterKey: PropTypes.string.isRequired
};

export default FellowFilterCard;
