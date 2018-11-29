import React from 'react';
import { FellowBioConnected } from '../../components/FellowBio';
import LMSProgressSummary from '../../components/LMSProgressSummary/LMSProgressSummaryContainer';
/**
 * Class representing Fellow Dashboard Page
 * @class
 */

const FellowDashboardMain = props => (
  <div className="container-fluid">
    <FellowBioConnected {...props} />
    <LMSProgressSummary />
  </div>
);

export default FellowDashboardMain;
