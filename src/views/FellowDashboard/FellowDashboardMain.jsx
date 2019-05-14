import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FellowBioConnected } from '../../components/FellowBio';
import { DevPulseChartConnected } from '../../components/DevPulseChart/DevPulseChart';
import LMSProgressSummary from '../../components/LMSProgressSummary/LMSProgressSummaryContainer';
import ProgressBarConnected from '../../components/ProgressBar/ProgressBarConnected';
import getFellowProfileDataAction from '../../redux/actionCreators/fellowProfileDataActions';
/**
 * Class representing Fellow Dashboard Page
 * @class
 */

export class FellowDashboard extends Component {
  componentDidMount() {
    const { getFellowProfileData } = this.props;
    getFellowProfileData();
  }

  render() {
    return (
      <div className="page-content container-fluid">
        <FellowBioConnected {...this.props} />
        <ProgressBarConnected />
        <DevPulseChartConnected />
        <LMSProgressSummary />
      </div>
    );
  }
}

FellowDashboard.propTypes = {
  getFellowProfileData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getFellowProfileData: fellowId =>
    dispatch(getFellowProfileDataAction(fellowId))
});

export default connect(
  () => {},
  mapDispatchToProps
)(FellowDashboard);
