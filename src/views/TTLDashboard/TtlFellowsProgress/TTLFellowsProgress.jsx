import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StackedBarChart from '../../../components/StackedBarChart';
import Filter from '../../OpsDashboard/FellowsProgress/Filter';
import '../../OpsDashboard/FellowsProgress/index.css';

class TTLFellowsProgress extends Component {
  constructor(props) {
    super(props);
    this.state = { location: 'All' };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { fetchLocations, fetchTTLFellowsProgress } = this.props;
    fetchLocations();
    fetchTTLFellowsProgress({ role: 'ttl' });
  }

  handleSelect(type, value) {
    const { fetchTTLFellowsProgress } = this.props;
    if (type === 'location') {
      this.setState({ location: value });
      fetchTTLFellowsProgress({ role: 'ttl', location: value });
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

  renderCharts = (d0, fellowDataLoading) => (
    <StackedBarChart title="Fellows" data={d0} loading={fellowDataLoading} />
  );

  render() {
    const { location } = this.state;
    const { fellowsProgress, locations } = this.props;
    const locationsAll = ['All', ...locations.locations.sort()];

    const fellowDataLoading = fellowsProgress.loading;
    return (
      <div className="fellow_progress">
        <h2 className="fellow_progress__title"> FELLOW’S PROGRESS BAR </h2>
        <div className="filters">
          {this.renderLocationFilter(locationsAll, location)}
        </div>
        {this.renderCharts(
          fellowsProgress.data.fellowsProgressD0,
          fellowDataLoading
        )}
      </div>
    );
  }
}

TTLFellowsProgress.propTypes = {
  fetchTTLFellowsProgress: PropTypes.func.isRequired,
  fellowsProgress: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.objectOf(PropTypes.array)])
  ).isRequired,
  fetchLocations: PropTypes.func.isRequired,
  locations: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
  ).isRequired
};

export default TTLFellowsProgress;
