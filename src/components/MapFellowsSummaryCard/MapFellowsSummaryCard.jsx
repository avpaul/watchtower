import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TranslatorTable from '../../utils/TranslatorTable';
import FellowsSummaryCard from '../FellowsSummaryCard';
import lmsResult from '../../utils/lmsOverall';

const getDateKey = {
  start: {
    D0A: 'simulationStartDate',
    D0B: 'actualApprenticeshipStartDate'
  },
  end: {
    D0A: 'expectedSimulationsCompletionDate',
    D0B: 'expectedApprenticeshipCompletionDate'
  }
};

const refineDate = (fellow, dateKey) => {
  /**
   ** Transforms date timestamp to a human readable format
   * @param fellow Fellow's details as an object
   * @param dateKey Part of the key for the date property to be rendered
   * from fellow object
   * @returns date (string)
   */
  const date = fellow[getDateKey[dateKey][fellow.level]];
  return !date ? 'No date' : moment(date).format('D-MMM-YYYY');
};

/**
 ** Renders the fellow's current progress status
 * @param fellow Fellow's details as an object
 */
const resolveStatus = fellow =>
  `${fellow.is_on_pip ? 'PIP&' : ''}${TranslatorTable[fellow.overall_status] ||
    'N/A'}`;

const renderFellow = (fellow, fellowIndex, handleClick) => {
  /**
   ** Renders the fellow summary card
   * @param fellow Fellow's details as an object
   * @param fellowIndex Fellow's index in the fellowSummaryDetails array
   * @param handleClick On click event listener function
   */

  let refinedName = fellow.name;
  refinedName =
    refinedName.length > 20 ? `${refinedName.substr(0, 18)} ...` : refinedName;
  return (
    <FellowsSummaryCard
      key={fellowIndex}
      id={fellow.fellow_id}
      name={refinedName}
      product={fellow.project}
      level={fellow.level}
      started={refineDate(fellow, 'start')}
      devPulseAverage={`${fellow.overall_average || 'N/A'}`.substr(0, 4)}
      status={resolveStatus(fellow)}
      ending={refineDate(fellow, 'end')}
      lmsOutputs={lmsResult(fellow)}
      picture={fellow.picture}
      onClick={handleClick}
    />
  );
};

const MapFellowsSummary = ({ fellowsSummaryCardDetails, handleClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <div className="row m-0">
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
