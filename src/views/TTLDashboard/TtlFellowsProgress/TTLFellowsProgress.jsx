import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StackedBarChart from '../../../components/StackedBarChart';
import Filter from '../../../components/FilterDropdown';
import '../../OpsDashboard/FellowsProgress/index.css';

class TTLFellowsProgress extends Component {
  constructor(props) {
    super(props);
    this.state = { location: 'All' };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { fetchTTLFellowsProgress } = this.props;
    fetchTTLFellowsProgress();
  }

  handleSelect(type, value) {
    const { fetchTTLFellowsProgress } = this.props;
    if (type === 'location') {
      this.setState({ location: value });
      fetchTTLFellowsProgress({ location: value });
    }
  }

  renderLocationFilter = (locationsAll, location) => (
    <Filter
      getFilter={this.handleSelect}
      search={false}
      type="location"
      current={location}
      title="Location Filter"
      items={locationsAll}
      key="1"
    />
  );

  renderCharts = (d0, fellowDataLoading) =>
    d0.length === 0 && fellowDataLoading === false ? (
      <div className="empty_chart">No fellow in this location</div>
    ) : (
      <StackedBarChart title="Fellows" data={d0} loading={fellowDataLoading} />
    );

  render() {
    const { location } = this.state;
    const { fellowsProgress, locations } = this.props;
    const locationsAll = ['All', ...locations.map(loc => loc.name).sort()];
    const cohorts = [
      ...(fellowsProgress.data.D0A || []),
      ...(fellowsProgress.data.D0B || [])
    ];
    const fellowDataLoading = fellowsProgress.loading;
    return (
      <div className="fellow_progress">
        <h2 className="fellow_progress__title"> FELLOW’S PROGRESS BAR </h2>
        <div className="filters">
          {this.renderLocationFilter(locationsAll, location)}
        </div>
        {this.renderCharts(cohorts, fellowDataLoading)}
      </div>
    );
  }
}

TTLFellowsProgress.propTypes = {
  fetchTTLFellowsProgress: PropTypes.func.isRequired,
  fellowsProgress: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.objectOf(PropTypes.array),
      PropTypes.string
    ])
  ).isRequired,
  locations: PropTypes.instanceOf(Array)
};

TTLFellowsProgress.defaultProps = {
  locations: []
};

export default TTLFellowsProgress;
