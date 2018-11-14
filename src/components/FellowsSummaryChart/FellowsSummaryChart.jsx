import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowChart from '../FellowChart';

class FellowsSummaryChart extends Component {
  state = {
    fellowsSummaryFilter: 'ALL',
    showChart: true
  };

  componentDidMount() {
    const { getFellowCountHistory } = this.props;
    getFellowCountHistory();
  }

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  render() {
    const { fellowsSummaryFilter, showChart } = this.state;
    const { fellowCountHistory } = this.props;
    return (
      <div>
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            {...fellowCountHistory}
          />
        )}
      </div>
    );
  }
}
FellowsSummaryChart.propTypes = {
  getFellowCountHistory: PropTypes.func.isRequired,
  fellowCountHistory: PropTypes.shape({
    error: PropTypes.string,
    countSummary: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool
  }).isRequired
};

export default FellowsSummaryChart;
