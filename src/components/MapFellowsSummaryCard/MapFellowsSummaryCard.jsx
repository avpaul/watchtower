import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FellowsSummaryCard from '../FellowsSummaryCard';

const MapFellowsSummary = ({ fellowsSummaryCardDetails, handleClick }) => {
  const refineDate = (fellow, Start) =>
    moment(
      fellow.level && fellow.level.includes('D0A')
        ? fellow[`sims${Start}Date`]
        : fellow[`appr${Start}Date`]
    ).format('D-MMM-YYYY');
  const resolveStatus = fellowStatus =>
    fellowStatus.status.includes('ltWk5') ? 'Off-Track' : 'On-Track';
  return (
    <div className="ops-dashboard__fellows-summary">
      <div className="row">
        {fellowsSummaryCardDetails.map(fellow => {
          const refinedName = `${fellow.firstName ||
            `${fellow.user ? fellow.user.firstName : ''}`} ${fellow.lastName ||
            `${fellow.user ? fellow.user.lastName : ''}`}`;
          return (
            <FellowsSummaryCard
              key={fellowsSummaryCardDetails.indexOf(fellow)}
              id={fellowsSummaryCardDetails.indexOf(fellow)}
              name={
                refinedName.length > 20
                  ? `${refinedName.substr(0, 18)} ...`
                  : refinedName
              }
              product={fellow.project}
              level={fellow.level ? fellow.level.split(' ')[0] : ''}
              started={
                refineDate(fellow, 'Start') === 'Invalid date'
                  ? 'No date'
                  : refineDate(fellow, 'Start')
              }
              devPulseAverage={fellow.devPulseAverage}
              status={
                fellow.status && fellow.status.includes('gteWk5')
                  ? 'PIP'
                  : resolveStatus(fellow)
              }
              ending={
                refineDate(fellow, 'End') === 'Invalid date'
                  ? 'No date'
                  : refineDate(fellow, 'End')
              }
              lmsOutputs={fellow.lmsOutput}
              picture={fellow.picture}
              onClick={handleClick}
            />
            // </div>
          );
        })}
      </div>
    </div>
  );
};

MapFellowsSummary.propTypes = {
  fellowsSummaryCardDetails: PropTypes.shape([]).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default MapFellowsSummary;
