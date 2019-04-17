import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FellowsSummaryCard from '../FellowsSummaryCard';
import { roundOff } from '../../utils/index';

const refineDate = (fellow, dateKey) => {
  /**
   ** Transforms date timestamp to a human readable format
   * @param fellow Fellow's details as an object
   * @param dateKey Part of the key for the date property to be rendered
   * from fellow object
   * @returns date (string)
   */
  let date = '';
  switch (fellow.level) {
    case 'D0A':
      date =
        dateKey === 'Start'
          ? fellow.simulationStartDate
          : fellow.actualSimulationsCompletionDate;
      return moment(date).format('D-MMM-YYYY');
    case 'D0B':
      date =
        dateKey === 'Start'
          ? fellow.actualApprenticeshipStartDate
          : fellow.expectedApprenticeshipCompletionDate;
      return moment(date).format('D-MMM-YYYY');
    default:
      return 'No date';
  }
};

const resolveStatus = fellow => {
  /**
   ** Renders the fellow's current progress status
   * @param fellow Fellow's details as an object
   */
  if (fellow.overall_status === 'offTrack') {
    return 'Off-Track';
  }
  if (fellow.overall_status === 'onTrack') {
    return 'On-Track';
  }
  return fellow.overall_status;
};

const computeLmsOrDevpulse = (fellow, option) => {
  if (fellow.overall_status === 'N/A' || (!fellow.submitted && !fellow.total)) {
    return 'N/A';
  }
  switch (option) {
    case 'pulse':
      return roundOff(fellow.overall_average, 2);
    case 'lms':
      return `${fellow.submitted}/${fellow.total}`;
    default:
      return 'N/A';
  }
};

const renderFellow = (fellow, fellowIndex, handleClick) => {
  /**
   ** Renders the fellow summary card
   * @param fellow Fellow's details as an object
   * @param fellowIndex Fellow's index in the fellowSummaryDetails array
   * @param handleClick On click event listener function
   */
  const { name } = fellow;
  const refinedName = name.length > 20 ? `${name.substr(0, 18)} ...` : name;

  return (
    <FellowsSummaryCard
      key={fellowIndex}
      id={fellowIndex}
      name={refinedName}
      product={fellow.project || ''}
      level={fellow.level}
      started={refineDate(fellow, 'Start')}
      devPulseAverage={computeLmsOrDevpulse(fellow, 'pulse')}
      status={resolveStatus(fellow)}
      ending={refineDate(fellow, 'End')}
      lmsOutputs={computeLmsOrDevpulse(fellow, 'lms')}
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
