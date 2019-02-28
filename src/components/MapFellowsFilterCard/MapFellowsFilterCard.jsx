import React from 'react';
import PropTypes from 'prop-types';
import FellowFilterCard from '../FellowFilterCard';

/**
 * @method MapFellowsFilterCard
 * @summary Method to render fellow's cards by status and project
 * @param { fellowSummaryDetails { Array of all fellows }
 * display {default- status } handleCardClick {function}
 * isTicked {object Project|status }} param0 {Object}
 * @returns A rendered version of a clickable fellows card that displays all products,
 * the number of fellows in a product, status of the fellows (PIP|onTrack|offTrack)
 * and details included in the fellowSummaryDetails
 */
const MapFellowsFilterCard = ({
  fellowSummaryDetails,
  display = 'status',
  handleCardClick,
  isTicked
}) => {
  let offTrack = 0;
  let pip = 0;
  let onTrack = 0;
  let refinedArray;
  if (display === 'status') {
    fellowSummaryDetails.forEach(fellow => {
      if (fellow.status && fellow.status.includes('gteWk5')) pip += 1;
      if (fellow.status && fellow.status.includes('ltWk5')) offTrack += 1;
      if (fellow.status && fellow.status.includes('onTrack')) onTrack += 1;
    });
    const allFellows = pip + offTrack + onTrack;
    refinedArray = [
      { 'All Fellows': allFellows },
      { 'On Track': onTrack },
      { 'Off-Track': offTrack },
      { PIP: pip }
    ];
  }

  /**
   * @fires this code when display is project.
   */
  if (display === 'project') {
    refinedArray = [{ 'All Products': fellowSummaryDetails.length }];
    const productArray = {};
    fellowSummaryDetails.forEach(fellow => {
      if (!productArray[fellow.project]) {
        productArray[fellow.project] = 1;
      } else {
        productArray[fellow.project] += 1;
      }
    });
    refinedArray = [
      ...refinedArray,
      ...Array.from(Object.keys(productArray), product => ({
        [product]: productArray[product]
      }))
    ];
  }

  return (
    <div className="ops-dashboard__fellows-summary">
      <div className="row">
        {refinedArray.map(fellows => (
          <FellowFilterCard
            cardName={Object.keys(fellows)[0]}
            numberOfFellows={fellows[Object.keys(fellows)[0]]}
            isTicked={isTicked}
            handleCardClick={handleCardClick}
            filterKey={display}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * @name MapFellowsFilterCard Proptypes
 * @type (Proptypes)
 * @property fellowSummaryDetails - Arrays of objects
 * @property display - String - status | project
 * @property handleCardClick - function
 * @property isTicked - string
 */
MapFellowsFilterCard.propTypes = {
  fellowSummaryDetails: PropTypes.shape([]).isRequired,
  display: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  isTicked: PropTypes.string.isRequired
};

export default MapFellowsFilterCard;
