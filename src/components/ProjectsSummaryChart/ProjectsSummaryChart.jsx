import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectsSummary from '../ProjectsSummary';
import FellowChart from '../FellowChart';

class ProjectsSummaryChart extends Component {
  state = {
    fellowsSummaryFilter: 'Total',
    showChart: false,
    selected: 'Today'
  };

  componentDidMount() {
    const { fetchTtlProjects, user, fetchFellowsSummaryTTLLF } = this.props;
    const name = user.email.includes('wt-test')
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_NAME
      : user.name;
    fetchTtlProjects(name);
    fetchFellowsSummaryTTLLF(name);
  }

  updateSelected = selected => {
    this.setState({ selected });
  };

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    const { fellowsSummary } = this.props;
    const { fellowsSummaryToday } = fellowsSummary;
    if (
      fellowsSummaryToday.keys &&
      !(currentCard in fellowsSummaryToday.keys)
    ) {
      this.setState({ showChart: true, fellowsSummaryFilter: currentCard });
    }
  };

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  updateFellowSummary = selected => {
    const { fellowsSummary } = this.props;
    const history = fellowsSummary.fellowsSummaryToday.data;
    const treads = fellowsSummary.fellowsSummaryTrend.data;

    let datapoint;
    if (selected === 'Today') {
      datapoint = history;
    } else if (selected === 'Trend') {
      datapoint = treads;
    }
    return datapoint;
  };

  getCurrentClass = () => {
    const { fellowsSummaryFilter } = this.state;
    const { fellowsSummary } = this.props;
    const history = fellowsSummary.fellowsSummaryToday.keys;
    if (history) {
      const index = history.indexOf(fellowsSummaryFilter);
      const width = 23.5;
      return { '--fellow-chart-tooltip': `${width / 2 + index * width - 4}%` };
    }
    return { '--fellow-chart-tooltip': `${12}%` };
  };

  render() {
    const { fellowsSummaryFilter, showChart, selected } = this.state;
    const { fellowsSummary, user } = this.props;
    const data = this.updateFellowSummary(selected);
    return (
      <div>
        <ProjectsSummary handleCardClick={this.handleCardClick} />
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            updateSelected={this.updateSelected}
            {...fellowsSummary}
            data={data}
            fellowChartTooltipClass={this.getCurrentClass()}
            user={user}
          />
        )}
      </div>
    );
  }
}

ProjectsSummaryChart.propTypes = {
  fetchTtlProjects: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  fetchFellowsSummaryTTLLF: PropTypes.func.isRequired,
  fellowsSummary: PropTypes.instanceOf(Object).isRequired
};

export default ProjectsSummaryChart;
