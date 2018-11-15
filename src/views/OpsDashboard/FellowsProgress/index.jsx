import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StackedBarChart from '../../../components/StackedBarChart';
import './index.css';
import Filter from './Filter';
import getTTLsActions, * as getLocationsActions from '../../../redux/actionCreators/ttlActions';
import getFellowProgressAction from '../../../redux/actionCreators/fellowProgressActions';

export class FellowsProgress extends Component {
  state = {
    ttl: 'All',
    location: 'All'
  };

  componentDidMount() {
    const { getFellowProgress, getTTLs, getLocations } = this.props;
    getFellowProgress();
    getTTLs();
    getLocations();
  }

  getFilter = (type, value) => {
    const { getFellowProgress, ttls } = this.props;
    const { location, ttl } = this.state;
    if (type === 'ttl') {
      const result = ttls.ttls.filter(
        ttlitem => `${ttlitem.firstName} ${ttlitem.lastName}` === value
      );
      if (result.length !== 0) {
        this.setState({
          ttl: result[0]
        });
        getFellowProgress({ ttl: result[0].staffId, location });
      } else {
        this.setState({
          ttl: 'All'
        });
        getFellowProgress({ ttl: 'all', location });
      }
    }

    if (type === 'location') {
      this.setState({
        location: value
      });
      getFellowProgress({ location: value, ttl: ttl.staffId });
    }
  };

  renderFilters = (locationsAll, location, currentTTL, ttlsAvilable) => (
    <Fragment>
      <div>
        <Filter
          key="1"
          search={false}
          type="location"
          title="Location Filter"
          items={locationsAll}
          current={location}
          getFilter={this.getFilter}
        />
      </div>
      <div>
        <Filter
          key="2"
          search
          current={currentTTL}
          title="TTL/LF Filter"
          items={['All', ...ttlsAvilable]}
          getFilter={this.getFilter}
          type="ttl"
        />
      </div>
    </Fragment>
  );

  renderCharts = (dob, doa, fellowDataLoading) => (
    <Fragment>
      <StackedBarChart
        title="DOB Fellows"
        data={dob}
        loading={fellowDataLoading}
      />
      <StackedBarChart
        title="DOA Fellows"
        data={doa}
        loading={fellowDataLoading}
      />
    </Fragment>
  );

  render() {
    const { ttl, location } = this.state;
    const { ttls, fellowsProgress, locations } = this.props;
    const doa =
      fellowsProgress.fellowsProgressD0A && fellowsProgress.fellowsProgressD0A;
    const dob =
      fellowsProgress.fellowsProgressD0B && fellowsProgress.fellowsProgressD0B;

    const ttlsAvilable =
      ttls.ttls.length !== 0
        ? ttls.ttls.map(ttla => `${ttla.firstName} ${ttla.lastName}`)
        : [];
    const locationsAll = ['All', ...locations.locations];
    const currentTTL =
      ttl !== 'All' ? `${ttl.firstName} ${ttl.lastName}` : 'All';

    const fellowDataLoading = fellowsProgress.loading;
    return (
      <div className="fellow_progress">
        <h2 className="fellow_progress__title"> FELLOW’S PROGRESS BAR </h2>
        <div className="filters">
          {this.renderFilters(locationsAll, location, currentTTL, ttlsAvilable)}
        </div>
        {this.renderCharts(dob, doa, fellowDataLoading)}
      </div>
    );
  }
}

const mapStateToProps = ({ ttls, fellowsProgress, locations }) => ({
  ttls,
  fellowsProgress,
  locations
});

FellowsProgress.propTypes = {
  getFellowProgress: PropTypes.func.isRequired,
  fellowsProgress: PropTypes.shape({
    loading: PropTypes.bool,
    fellowsProgressD0A: PropTypes.array,
    fellowsProgressD0B: PropTypes.array
  }).isRequired,
  getTTLs: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    locations: PropTypes.array
  }).isRequired,
  ttls: PropTypes.shape({
    loading: PropTypes.bool,
    ttls: PropTypes.array
  }).isRequired
};

export const FellowsProgressConnected = connect(
  mapStateToProps,
  {
    getTTLs: getTTLsActions,
    getFellowProgress: getFellowProgressAction,
    getLocations: getLocationsActions.getLocations
  }
)(FellowsProgress);