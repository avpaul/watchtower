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
    const { getFellowSummaryOps } = this.props;
    getFellowSummaryOps();
  }

  handleChartClose = () => this.setState({ showChart: false });

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    this.setState({ showChart: true, fellowsSummaryFilter: currentCard });
  };

  updateFellowSummary = selected => {
    const { fellowsSummary } = this.props;
    return fellowsSummary[`fellowsSummary${selected}`];
  };

  updateSelected = selected => this.setState({ selected });

  render() {
    const { fellowsSummaryFilter, showChart, selected } = this.state;
    const { displayByRole, user, fellowsSummary } = this.props;
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
            data={data}
            user={user}
            loading={fellowsSummary.loading}
          />
        )}
      </Fragment>
    );
  }
}

FellowsSummaryChart.propTypes = {
  displayByRole: PropTypes.shape({}),
  fellowsSummary: PropTypes.shape([]).isRequired,
  getFellowSummaryOps: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired
};

FellowsSummaryChart.defaultProps = {
  displayByRole: null
};

export default FellowsSummaryChart;
