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
    const { fetchPerformanceData } = this.props;
    fetchPerformanceData();
  }

  handleChartClose = () => this.setState({ showChart: false });

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    this.setState({ showChart: true, fellowsSummaryFilter: currentCard });
  };

  updateFellowSummary = selected => {
    const {
      fellowsPerformanceData: { data }
    } = this.props;
    return data[`${selected.toLowerCase()}`];
  };

  updateSelected = selected => this.setState({ selected });

  render() {
    const { fellowsSummaryFilter, showChart, selected } = this.state;
    const { displayByRole, user, fellowsPerformanceData, loading } = this.props;
    const { data } = this.updateFellowSummary(selected);

    return (
      <Fragment>
        <FellowsSummary
          handleCardClick={this.handleCardClick}
          displayByRole={displayByRole}
          loading={loading}
        />
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            updateSelected={this.updateSelected}
            data={data}
            user={user}
            loading={fellowsPerformanceData.loading}
          />
        )}
      </Fragment>
    );
  }
}

FellowsSummaryChart.propTypes = {
  displayByRole: PropTypes.shape({}),
  fellowsPerformanceData: PropTypes.shape({}).isRequired,
  fetchPerformanceData: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  loading: PropTypes.bool
};

FellowsSummaryChart.defaultProps = {
  displayByRole: null,
  loading: false
};

export default FellowsSummaryChart;
