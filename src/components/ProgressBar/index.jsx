import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { calcNoOfWeeks, getCurrentWeek } from '../../services/helper';

const calcProgressWidth = (startDate, endDate) => {
  const noOfWeeks = calcNoOfWeeks(startDate, endDate).length;
  return (1 / noOfWeeks) * 100 * getCurrentWeek(startDate);
};

const ProgressContainer = props => {
  const isSmallScreen = !!(window.screen.width < 770);
  const { fellow } = props;
  const {
    actualApprenticeshipStartDate,
    simulationStartDate,
    expectedApprenticeshipCompletionDate,
    expectedSimulationsCompletionDate,
    status
  } = fellow.fellow;
  const startDate = actualApprenticeshipStartDate || simulationStartDate;
  const endDate =
    expectedApprenticeshipCompletionDate || expectedSimulationsCompletionDate;
  return (
    <ProgressBar
      noOfWeeks={calcNoOfWeeks(startDate, endDate)}
      isSmallScreen={isSmallScreen}
      onTrack={!!(status === 'onTrack')}
      widthStyle={{ '--value': `${calcProgressWidth(startDate, endDate)}%` }}
    />
  );
};

ProgressContainer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  fellow: PropTypes.objectOf(PropTypes.string).isRequired
};
export default ProgressContainer;
