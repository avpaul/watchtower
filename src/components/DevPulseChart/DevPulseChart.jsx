import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getFellowDevPulseAction from '../../redux/actionCreators/fellowDevPulseActions';
import Chart from './Chart/Chart';
import './DevPulseChart.css';

export class DevPulseChart extends Component {
  componentDidMount() {
    const { getFellowDevPulse } = this.props;
    getFellowDevPulse();
  }

  render() {
    const { fellowDevPulse } = this.props;
    const { ratings, averageRatings } = fellowDevPulse;

    return (
      <div className="pulse-chart-container">
        <div className="pulse-chart__title">DEVPULSE</div>
        <div className="pulse-chart">
          <Chart data={ratings.reverse()} averageRatings={averageRatings} />
        </div>
      </div>
    );
  }
}
export const mapStateToProps = ({ fellowDevPulse }) => ({
  fellowDevPulse
});

DevPulseChart.propTypes = {
  fellowDevPulse: PropTypes.shape({
    loading: PropTypes.bool,
    ratings: PropTypes.array.isRequired,
    averageRatings: PropTypes.object
  }).isRequired,
  getFellowDevPulse: PropTypes.func.isRequired
};

export const DevPulseChartConnected = connect(
  mapStateToProps,
  {
    getFellowDevPulse: getFellowDevPulseAction
  }
)(DevPulseChart);
