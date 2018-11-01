import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import DashboardTable from '../../components/DashboardTable';
import Filters from '../../components/Filters/Filters';
import Error from '../../components/Error';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/Pagination/Pagination.css';
import SearchBar from '../../components/SearchBar/SearchBar';

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
      search: ''
    };
  }

  componentDidMount() {
    const { getFellows, filter } = this.props;
    getFellows({ filter, ...this.state });
  }

  onChange = event => {
    const { filter, getFellows } = this.props;
    const newState = event.target.value;
    this.setState({ perPage: newState }, () => {
      getFellows({ filter, ...this.state });
    });
    this.setState({ perPage: newState });
  };

  handleSearchChange = event => {
    this.setState({ search: event.target.value });
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
        showing {pagination.page} of {pagination.pages} pages
      </p>
    );
  };

  renderPerPageSelector = () => (
    <div className="row d-flex justify-content-center">
      <div className="per-page">Per page</div>
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

  handlePageChange = url => {
    const { getFellows } = this.props;
    getFellows({ url });
  };

  handleValueChange = value => {
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
      getFellows
    } = this.props;
    const { search } = this.state;

    return (
      <Filters
        filter={filter}
        setFilter={setVisibilityFilter}
        getFellows={getFellows}
        summary={summary}
        search={search}
        perPage={perPage}
        loading={loading}
      />
    );
  }

  renderPageBody() {
    const {
      fellows,
      loading,
      getFellows,
      filter,
      pagination: { perPage }
    } = this.props;
    const { search } = this.state;

    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Fragment>
          {this.renderFilter()}
          <SearchBar
            getFellows={getFellows}
            perPage={perPage}
            filter={filter}
            search={search}
            handleSearchChange={this.handleSearchChange}
          />
          <DashboardTable fellows={fellows} loading={loading} />
        </Fragment>
      </ErrorBoundary>
    );
  }

  render() {
    const { error, user, role } = this.props;
    const { ErrorPage } = Error;
    return (
      <div>
        <Header user={user} role={role} />
        {error ? <ErrorPage /> : this.renderPageBody()}
        {this.returnShowing()}
        <div>
          {this.renderPerPageSelector()}
          &nbsp;
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
    ltWk5OffTrack: 0
  },
  error: ''
};

DashboardPage.propTypes = {
  setVisibilityFilter: PropTypes.func.isRequired,
  fellows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired
    })
  ).isRequired,
  getFellows: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired
  }),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  filter: PropTypes.string.isRequired,
  error: PropTypes.string
};
