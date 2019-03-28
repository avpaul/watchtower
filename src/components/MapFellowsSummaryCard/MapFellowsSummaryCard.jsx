import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FellowsSummaryCard from '../FellowsSummaryCard';

const refineDate = (fellow, dateKey) => {
  /**
   ** Transforms date timestamp to a human readable format
   * @param fellow Fellow's details as an object
   * @param dateKey Part of the key for the date property to be rendered
   * from fellow object
   * @returns date (string)
   */
  const date =
    fellow.level && fellow.level.includes('D0A')
      ? fellow[`sims${dateKey}Date`]
      : fellow[`appr${dateKey}Date`];
  return !date ? 'No date' : moment(date).format('D-MMM-YYYY');
};

const resolveStatus = fellow => {
  /**
   ** Renders the fellow's current progress status
   * @param fellow Fellow's details as an object
   */
  if (!fellow.status && !fellow.pipStatus) return 'No Status';

  if (
    fellow.status.includes('gteWk5') ||
    (fellow.status.includes('ltWk5') && !fellow.pipStatus)
  )
    return 'Off-Track';

  if (fellow.pipStatus) return 'PIP';

  return 'On-Track';
};

const renderFellow = (fellow, fellowIndex, handleClick) => {
  /**
   ** Renders the fellow summary card
   * @param fellow Fellow's details as an object
   * @param fellowIndex Fellow's index in the fellowSummaryDetails array
   * @param handleClick On click event listener function
   */
  const fellowBio = fellow.user ? fellow.user : fellow;
  let refinedName = `${fellowBio.firstName} ${fellowBio.lastName}`;
  refinedName =
    refinedName.length > 20 ? `${refinedName.substr(0, 18)} ...` : refinedName;
  return (
    <FellowsSummaryCard
      key={fellowIndex}
      id={fellowIndex}
      name={refinedName}
      product={fellow.project}
      level={fellow.level ? fellow.level.split(' ')[0] : ''}
      started={refineDate(fellow, 'Start')}
      devPulseAverage={fellow.devPulseAverage}
      status={resolveStatus(fellow)}
      ending={refineDate(fellow, 'End')}
      lmsOutputs={fellow.lmsOutput}
      picture={fellow.picture}
      onClick={handleClick}
    />
  );
};

const MapFellowsSummary = ({ fellowsSummaryCardDetails, handleClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <div className="row">
      {fellowsSummaryCardDetails.map((fellow, index) =>
        renderFellow(fellow, index, handleClick)
      )}
    </div>
  </div>
);

MapFellowsSummary.propTypes = {
  fellowsSummaryCardDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default MapFellowsSummary;
