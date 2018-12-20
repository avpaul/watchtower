import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LMSChart from './LMSChart';
import './LMSChart/LMSChart.css';

class LMSProgressSummary extends Component {
  componentDidMount() {
    const { getLmsSummary, getLmsSubmissions } = this.props;
    getLmsSummary();
    getLmsSubmissions();
  }

  render() {
    const { lmsSummary, lmsSubmissions } = this.props;
    return lmsSubmissions && Object.values(lmsSubmissions).length > 0 ? (
      <LMSChart lmsSummary={lmsSummary} lmsSubmissions={lmsSubmissions} />
    ) : (
      <div className="lms-chart timeline">No LMS Data</div>
    );
  }
}

LMSProgressSummary.propTypes = {
  getLmsSummary: PropTypes.func.isRequired,
  getLmsSubmissions: PropTypes.func.isRequired,
  lmsSummary: PropTypes.instanceOf(Object).isRequired,
  lmsSubmissions: PropTypes.instanceOf(Object).isRequired
};

export default LMSProgressSummary;
