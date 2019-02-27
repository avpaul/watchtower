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
    fellowStatus.status.includes('gteWk5') ? 'Off-Track' : 'On-Track';
  return (
    <div className="ops-dashboard__fellows-summary">
      <div className="row">
        {fellowsSummaryCardDetails.map(fellow => {
          const refinedName = `${fellow.firstName ||
            fellow.user.firstName} ${fellow.lastName || fellow.user.lastName}`;
          return (
            <FellowsSummaryCard
              mykey={fellowsSummaryCardDetails.indexOf(fellow)}
              key={fellowsSummaryCardDetails.indexOf(fellow)}
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
                fellow.status && fellow.status.includes('ltWk5')
                  ? 'Pip'
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
