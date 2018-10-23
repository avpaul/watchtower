import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import DashboardTable from '../../components/DashboardTable';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';

class DashboardPage extends Component {
  componentDidMount() {
    const {
      pagination: { page, perPage },
      getFellows,
    } = this.props;
    getFellows({ perPage, page });
  }

  render() {
    const {
      summary,
      fellows,
      filter,
      setVisibilityFilter,
      pagination: { page, perPage },
      getFellows,
      loading,
    } = this.props;
    return (
      <div style={{ backgroundColor: '#F4F8F9', minHeight: '85vh' }}>
        <Header />
        <Filters
          filter={filter}
          setFilter={setVisibilityFilter}
          getFellows={getFellows}
          summary={summary}
          page={page}
          perPage={perPage}
        />
        <DashboardTable fellows={fellows} />
        {loading && <Loader /> }
      </div>
    );
  }
}

DashboardPage.defaultProps = {
  summary: {
    onTrack: 0,
    gteWk5OffTrack: 0,
    ltWk5OffTrack: 0,
  },
};

DashboardPage.propTypes = {
  setVisibilityFilter: PropTypes.func.isRequired,
  getFellows: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired,
  }),
  fellows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  filter: PropTypes.string.isRequired,
};

export default DashboardPage;
