import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StackedBarChart from '../../../components/StackedBarChart';
import './index.scss';
import Filter from '../../../components/FilterDropdown';
import getFellowProgressAction from '../../../redux/actionCreators/fellowProgressActions';

export class FellowsProgress extends Component {
  state = {
    lfTtl: 'All',
    location: 'All'
  };

  componentDidMount() {
    const { getFellowProgress } = this.props;
    getFellowProgress();
  }

  getFilter = (type, value) => {
    const { getFellowProgress, ttls, lfs } = this.props;
    const { location, lfTtl } = this.state;

    switch (type) {
      case 'lfTtl': {
        const ttlData = ttls.find(ttlitem => `${ttlitem.name}` === value);
        const lfData = lfs.find(lfitem => `${lfitem.name}` === value);
        const result = ttlData || lfData;
        this.setState({ lfTtl: result || 'All' });
        getFellowProgress({
          manager: result ? result.staff_id : null,
          location
        });
        break;
      }
      case 'location': {
        this.setState({ location: value });
        getFellowProgress({ location: value, manager: lfTtl.staff_id });
        break;
      }
      default:
        break;
    }
  };

  renderFilters = (locationsAll, location, currentTTL, lfsTtlsAvailable) => (
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
          chevronColor="#808FA3"
        />
      </div>
      <div>
        <Filter
          key="2"
          search
          current={currentTTL}
          title="TTL/LF Filter"
          items={['All', ...lfsTtlsAvailable.sort()]}
          getFilter={this.getFilter}
          type="lfTtl"
          characterLength={35}
          width="13rem"
          chevronColor="#808FA3"
        />
      </div>
    </Fragment>
  );

  /**
   * Renders the fellows by cohort charts
   * @param string D0 A string of either 'D0A' or 'D0B'
   * @param object fellowsProgress redux state
   * @return JSX
   */
  renderCharts = (D0, { data, loading }) => (
    <Fragment>
      {(!data[D0] || data[D0].length === 0) && !loading ? (
        <div className="empty_chart">No {D0} Fellows found</div>
      ) : (
        <StackedBarChart
          title={`${D0} Fellows`}
          data={data[D0]}
          loading={loading}
        />
      )}
    </Fragment>
  );

  render() {
    const { lfTtl, location } = this.state;
    const { ttls, lfs, fellowsProgress, locations } = this.props;
    const ttlsName = ttls.map(ttlName => `${ttlName.name}`);
    const lfsName = lfs.map(lfName => `${lfName.name}`);
    const lfsTtls = ttlsName.concat(lfsName);
    const locationsAll = ['All', ...locations.map(place => place.name).sort()];
    const currentTTL = lfTtl !== 'All' ? `${lfTtl.name}` : 'All';

    return (
      <div className="fellow_progress">
        <h2 className="fellow_progress__title"> FELLOWS PROGRESS BAR </h2>
        <div className="filters">
          {this.renderFilters(locationsAll, location, currentTTL, lfsTtls)}
        </div>
        {this.renderCharts('D0A', fellowsProgress)}
        {this.renderCharts('D0B', fellowsProgress)}
      </div>
    );
  }
}

const mapStateToProps = ({ fellowsProgress, opsSummary: { data } }) => ({
  ttls: data.managers.ttls,
  lfs: data.managers.lfs,
  fellowsProgress,
  locations: data.locations
});

FellowsProgress.propTypes = {
  getFellowProgress: PropTypes.func.isRequired,
  fellowsProgress: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.objectOf(PropTypes.array)
  }).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  ttls: PropTypes.instanceOf(Array).isRequired,
  lfs: PropTypes.instanceOf(Array).isRequired
};

export const FellowsProgressConnected = connect(
  mapStateToProps,
  {
    getFellowProgress: getFellowProgressAction
  }
)(FellowsProgress);
