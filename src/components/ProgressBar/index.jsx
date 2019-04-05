import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { calcNoOfWeeks, getCurrentWeek } from '../../services/helper';

const defaultFellowDetails = {
  actualApprenticeshipStartDate: new Date(),
  simulationStartDate: '',
  expectedApprenticeshipCompletionDate: new Date(),
  expectedSimulationsCompletionDate: ''
};

const calcProgressWidth = (startDate, endDate) => {
  const noOfWeeks = calcNoOfWeeks(startDate, endDate).length;
  return (1 / noOfWeeks) * 100 * getCurrentWeek(startDate);
};

/**
 * function to compute default end date using 12 weeks
 * @function {@param}
 */
const getDefaultEndDate = startDate => {
  const defaultNoOfDays = 12 * 7 + 1;
  const date = new Date();
  const result = startDate === undefined ? date : new Date(startDate);
  result.setDate(result.getDate() + defaultNoOfDays);
  const formattedDate = `${result.getFullYear()}-${result.getMonth() +
    1}-${result.getDate()}`;
  return formattedDate;
};

const newEndDate = (programEnddate, defaultEndDate) =>
  programEnddate === '' || programEnddate === undefined
    ? defaultEndDate
    : programEnddate;

const ProgressContainer = ({ fellow: { fellow, loading } }) => {
  const isSmallScreen = !!(window.screen.width < 770);
  const {
    details = defaultFellowDetails,
    status = {
      overall: ''
    }
  } = fellow;

  const startDate =
    details.actualApprenticeshipStartDate || details.simulationStartDate;
  const programEnddate =
    details.expectedApprenticeshipCompletionDate ||
    details.expectedSimulationsCompletionDate;
  const defaultEndDate = getDefaultEndDate(startDate);
  const endDate = newEndDate(programEnddate, defaultEndDate);

  return (
    <ProgressBar
      noOfWeeks={calcNoOfWeeks(startDate, endDate)}
      isSmallScreen={isSmallScreen}
      loader={loading}
      onTrack={!!status && status.overall === 'onTrack'}
      widthStyle={{ '--value': `${calcProgressWidth(startDate, endDate)}%` }}
    />
  );
};

ProgressContainer.propTypes = {
  fellow: PropTypes.shape({
    fellow: PropTypes.shape(),
    loading: PropTypes.bool
  }).isRequired
};

export default ProgressContainer;
