import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowChart from '../FellowChart';
import FellowsSummary from '../FellowsSummary';

class FellowsSummaryChart extends Component {
  state = {
    fellowsSummaryFilter: 'Total',
    showChart: false,
    selected: 'Today'
  };

  componentDidMount() {
    const {
      getFellowCountHistory,
      fetchFellowsSummary,
      getFellowSummaryOps
    } = this.props;
    fetchFellowsSummary();
    getFellowCountHistory();
    getFellowSummaryOps();
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
      this.setState({ showChart: true, fellowsSummaryFilter: 'Total' });
    }
  };

  updateFellowSummary = selected => {
    const { fellowsSummary } = this.props;
    const history = fellowsSummary.fellowsSummaryToday;
    const treads = fellowsSummary.fellowsSummaryTrend;
    let datapoint;
    if (selected === 'Today') {
      datapoint = history;
    } else if (selected === 'Trend') {
      datapoint = treads;
    }
    return datapoint;
  };

  updateSelected = selected => {
    this.setState({ selected });
  };

  render() {
    const { fellowsSummaryFilter, showChart, selected } = this.state;
    const { fellowCountHistory } = this.props;
    const { data } = this.updateFellowSummary(selected);
    return (
      <div>
        <FellowsSummary handleCardClick={this.handleCardClick} />
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            updateSelected={this.updateSelected}
            {...fellowCountHistory}
            data={data}
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
