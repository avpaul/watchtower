import React, { Component, Fragment } from 'react';
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
    const { getFellowCountHistory, getFellowSummaryOps } = this.props;
    getFellowCountHistory();
    getFellowSummaryOps();
  }

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    this.setState({ showChart: true, fellowsSummaryFilter: currentCard });
  };

  updateFellowSummary = selected => {
    const { fellowsSummary } = this.props;
    const history = fellowsSummary.fellowsSummaryToday;
    const trend = fellowsSummary.fellowsSummaryTrend;
    let datapoint;
    if (selected === 'Today') {
      datapoint = history;
    } else if (selected === 'Trend') {
      datapoint = trend;
    }
    return datapoint;
  };

  updateSelected = selected => {
    this.setState({ selected });
  };

  render() {
    const { fellowsSummaryFilter, showChart, selected } = this.state;
    const { fellowCountHistory, displayByRole, user } = this.props;
    const { data } = this.updateFellowSummary(selected);

    return (
      <Fragment>
        <FellowsSummary
          handleCardClick={this.handleCardClick}
          displayByRole={displayByRole}
        />
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            updateSelected={this.updateSelected}
            {...fellowCountHistory}
            data={data}
            user={user}
          />
        )}
      </Fragment>
    );
  }
}

FellowsSummaryChart.propTypes = {
  getFellowCountHistory: PropTypes.func.isRequired,
  displayByRole: PropTypes.shape({}),
  fellowsSummary: PropTypes.shape([]).isRequired,
  fellowCountHistory: PropTypes.shape({
    error: PropTypes.string,
    countSummary: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  getFellowSummaryOps: PropTypes.func.isRequired,
  fetchFellowsSummary: PropTypes.func,
  user: PropTypes.shape().isRequired
};

FellowsSummaryChart.defaultProps = {
  displayByRole: null,
  fetchFellowsSummary: () => {}
};

export default FellowsSummaryChart;
