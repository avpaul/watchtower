import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectsSummary from '../ProjectsSummary';

class ProjectsSummaryChart extends Component {
  componentDidMount() {
    const { fetchTtlProjects, user } = this.props;
    const name = user.email.includes('wt-test')
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_NAME
      : user.name;
    fetchTtlProjects(name);
  }

  handleCardClick = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <ProjectsSummary handleCardClick={this.handleCardClick} />
      </div>
    );
  }
}

ProjectsSummaryChart.propTypes = {
  fetchTtlProjects: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired
};

export default ProjectsSummaryChart;
