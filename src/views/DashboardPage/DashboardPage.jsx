import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import DashboardTable from '../../components/DashboardTable';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error';

/**
 * Class representing Dashboard Page
 * @class
 */
class DashboardPage extends Component {
  componentDidMount() {
    const {
      pagination: { page, perPage },
      getFellows,
    } = this.props;
    getFellows({ perPage, page });
  }

  renderFilter() {
    const {
      summary,
      filter,
      loading,
      setVisibilityFilter,
      pagination: { page, perPage },
      getFellows,
    } = this.props;

    return (
      <Filters
        filter={filter}
        setFilter={setVisibilityFilter}
        getFellows={getFellows}
        summary={summary}
        page={page}
        perPage={perPage}
        loading={loading}
      />
    );
  }

  renderPageBody() {
    const { fellows, loading } = this.props;

    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Fragment>
          {this.renderFilter()}
          <DashboardTable fellows={fellows} loading={loading} />
        </Fragment>
      </ErrorBoundary>
    );
  }

  render() {
    const { error, loading } = this.props;
    const { ErrorPage } = Error;
    return (
      <div style={{ backgroundColor: '#F4F8F9', minHeight: '85vh' }}>
        <Header />
        {loading && <Loader />}
        {error ? <ErrorPage /> : this.renderPageBody()}
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
  error: '',
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
    perPage: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  }).isRequired,
  filter: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default DashboardPage;
