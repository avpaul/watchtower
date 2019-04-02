import React from 'react';
import PropTypes from 'prop-types';
import check from '../../static/check-mark.svg';
import defaultPicture from '../../static/profile.svg';

/**
 * @method FellowFilterCard
 * @summary - Method to render fellow's cards that can be filtered
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
  filterKey,
  isManager,
  picture = '',
  displayPicture
}) => {
  const shouldDisplayTick =
    isTicked.project === cardName ||
    isTicked.status === cardName ||
    isTicked.type === cardName ||
    isTicked.criteria === cardName ||
    isTicked.level === cardName ||
    isTicked.manager_email === cardName;

  const shouldRenderImage =
    isManager && displayPicture ? (
      <img className="manager-picture" src={picture || defaultPicture} alt="" />
    ) : (
      ''
    );

  const adjustCardNameStyles = isManager && displayPicture ? `pl-3` : '';
  const cardNameStyle = isManager
    ? 'manager-filter-card'
    : 'fellow-filter-card';

  const styleCardNumber = `float-right right ${
    isManager ? 'manager-card__top mb-2' : 'mt-3'
  }  card-number-display`;

  return (
    <div
      className={`fellow-summary-card ${cardNameStyle} mt-4
    ${shouldDisplayTick ? 'fellow-card-highlight' : ''}`}
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
            display: shouldDisplayTick ? 'block' : 'none'
          }}
          src={check}
          alt=""
        />
      </div>
      <div className="float-left left-card mt-3 card-name">
        <div className="row">
          <div className="">{shouldRenderImage}</div>
          <div className="">
            <span className={adjustCardNameStyles}>{cardName}</span>
          </div>
        </div>
      </div>
      <div className={styleCardNumber}>{numberOfFellows}</div>
    </div>
  );
};

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
  isTicked: PropTypes.shape({}).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  filterKey: PropTypes.string.isRequired,
  isManager: PropTypes.bool,
  picture: PropTypes.string,
  displayPicture: PropTypes.bool
};

FellowFilterCard.defaultProps = {
  picture: '',
  isManager: false,
  displayPicture: false
};

export default FellowFilterCard;
