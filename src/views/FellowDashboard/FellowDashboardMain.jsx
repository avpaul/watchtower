import React from 'react';
import { FellowBioConnected } from '../../components/FellowBio';
import { DevPulseChartConnected } from '../../components/DevPulseChart/DevPulseChart';
import LMSProgressSummary from '../../components/LMSProgressSummary/LMSProgressSummaryContainer';
/**
 * Class representing Fellow Dashboard Page
 * @class
 */

const FellowDashboardMain = props => (
  <div className="container-fluid">
    <FellowBioConnected {...props} />
    <DevPulseChartConnected />
    <LMSProgressSummary />
  </div>
);

export default FellowDashboardMain;
