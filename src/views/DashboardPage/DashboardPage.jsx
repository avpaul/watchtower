import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import DashboardTable from '../../components/DashboardTable';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/Pagination/Pagination.css';

/**
 * Class representing Dashboard Page
 * @class
 */
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: '10',
      page: '1',
    };
  }

  componentWillMount() {
    const { page, perPage } = this.state;
    const { getFellows, filter } = this.props;
    getFellows(perPage, page, filter);
  }

  onChange = (event) => {
    const { filter, getFellows } = this.props;
    const newState = event.target.value;
    this.setState({ perPage: newState }, () => {
      const { perPage, page } = this.state;
      getFellows({ perPage, page, filter });
    });
    this.setState({ perPage: newState });
  };

  renderPagination = () => {
    const { perPage } = this.state;
    const { pagination, filter } = this.props;
    return (
      <Pagination
        firstPageUrl={pagination.firstPageURL}
        firstPage={pagination.from}
        totalPages={pagination.pages}
        finalPageUrl={pagination.finalPageURL}
        nextPage={pagination.nextPageURL}
        perPage={perPage}
        prevPageUrl={pagination.prevPageURL}
        handlePageChange={this.handlePageChange}
        handleValueChange={this.handleValueChange}
        currentPage={pagination.page}
        filter={filter}
      />
    );
  };

  returnShowing = () => {
    const { pagination } = this.props;
    return (
      <p className="text-center">
        showing
        {' '}
        {pagination.page}
        {' '}
        of
        {' '}
        {pagination.pages}
        {' '}
        pages
      </p>
    );
  };

  renderPerPageSelector = () => (
    <div className="row d-flex justify-content-center">
      <div className="per-page">
        Per page
      </div>
      <div className="select">
        <select
          className="form-control d-flex justify-content-center"
          defaultValue="10"
          onChange={this.onChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
      {this.renderPagination()}
    </div>

  );

  handlePageChange = (url) => {
    const { getFellows } = this.props;
    getFellows({ url });
  };

  handleValueChange = (value) => {
    const { perPage } = this.state;
    const { filter, getFellows } = this.props;
    const page = value;
    getFellows({ perPage, page, filter });
  };

  renderFilter() {
    const {
      summary,
      filter,
      loading,
      setVisibilityFilter,
      pagination: { perPage },
      getFellows,
    } = this.props;

    return (
      <Filters
        filter={filter}
        setFilter={setVisibilityFilter}
        getFellows={getFellows}
        summary={summary}
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
    const {
      loading, error,
    } = this.props;
    const { ErrorPage } = Error;
    return (
      <div style={{ backgroundColor: '#F4F8F9', minHeight: '85vh' }}>
        <Header />
        {loading && <Loader />}
        {error ? <ErrorPage /> : this.renderPageBody()}
        {this.returnShowing()}
        <div>
          {this.renderPerPageSelector()}&nbsp;

        </div>
      </div>
    );
  }
}
export default DashboardPage;

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
  fellows: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFellows: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired,
  }),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  }).isRequired,
  filter: PropTypes.string.isRequired,
  error: PropTypes.string,
};
