import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowChart from '../FellowChart';
import FellowsSummary from '../FellowsSummary';

class FellowsSummaryChart extends Component {
  state = {
    fellowsSummaryFilter: 'ALL',
    showChart: false
  };

  componentDidMount() {
    const { getFellowCountHistory, fetchFellowsSummary } = this.props;
    fetchFellowsSummary();
    getFellowCountHistory();
  }

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    if (currentCard === 'D0AFellowsCount') {
      this.setState({ showChart: true, fellowsSummaryFilter: 'D0A' });
    } else if (currentCard === 'D0BFellowsCount') {
      this.setState({ showChart: true, fellowsSummaryFilter: 'D0B' });
    } else {
      this.setState({ showChart: true, fellowsSummaryFilter: 'ALL' });
    }
  };

  render() {
    const { fellowsSummaryFilter, showChart } = this.state;
    const { fellowCountHistory } = this.props;
    return (
      <div>
        <FellowsSummary handleCardClick={this.handleCardClick} />
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
    countSummary: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired
};

export default FellowsSummaryChart;
