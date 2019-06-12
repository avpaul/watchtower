import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FellowBioConnected } from '../../components/FellowBio';
import { DevPulseChartConnected } from '../../components/DevPulseChart/DevPulseChart';
import { EngineerBioConnected } from '../../components/EngineerBio';
import LMSProgressSummary from '../../components/LMSProgressSummary/LMSProgressSummaryContainer';
import ProgressBarConnected from '../../components/ProgressBar/ProgressBarConnected';
import getFellowProfileDataAction from '../../redux/actionCreators/fellowProfileDataActions';
import getD1FellowProfileDataAction from '../../redux/actionCreators/d1FellowProfileDataAction';
/**
 * Class representing Fellow Dashboard Page
 * @class
 */

export class FellowDashboard extends Component {
  componentDidMount() {
    const { getFellowProfileData, getD1FellowProfileData } = this.props;
    getFellowProfileData();
    getD1FellowProfileData();
  }

  render() {
    return (
      <div className="page-content container-fluid">
        <FellowBioConnected {...this.props} />
        <EngineerBioConnected {...this.props} />
        <ProgressBarConnected />
        <DevPulseChartConnected />
        <LMSProgressSummary />
      </div>
    );
  }
}

FellowDashboard.propTypes = {
  getFellowProfileData: PropTypes.func.isRequired,
  getD1FellowProfileData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getFellowProfileData: fellowId =>
    dispatch(getFellowProfileDataAction(fellowId)),
  getD1FellowProfileData: () => dispatch(getD1FellowProfileDataAction())
});

export default connect(
  () => {},
  mapDispatchToProps
)(FellowDashboard);
