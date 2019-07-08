import React from 'react';
import PropTypes from 'prop-types';
import LMSChart from './LMSChart';
import './LMSChart/LMSChart.scss';

export default function LMSProgressSummary(props) {
  const {
    fellow: { fellow }
  } = props;
  const { lms_submissions: lmsSubmissions, lms } = fellow;

  if (!lmsSubmissions || !lms)
    return (
      <div className="lms-chart">
        <div className="lms-chart__header">LMS</div>
        <div className="lms-chart__wrapper">
          <div className="lms-chart__timeline timeline">No LMS Data</div>
        </div>
      </div>
    );

  return <LMSChart lmsSummary={lms} lmsSubmissions={lmsSubmissions} />;
}

LMSProgressSummary.propTypes = {
  fellow: PropTypes.shape({
    fellow: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired
};
