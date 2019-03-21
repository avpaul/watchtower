import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'jspdf-autotable';
import jsonToCsv from '../../utils/jsonToCsv';
import jsonToPdf from '../../utils/jsonToPdf';
import DashboardTable from '../../components/DashboardTable';
import Error from '../../components/Error';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/Pagination/Pagination.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterDropdown from '../OpsDashboard/FellowsProgress/Filter';
import './index.css';
import Filters from './Filters/Filters';
import FilterButton from '../../components/Buttons/Button';
import table from './tableHeaders';
import {
  getCriteriaFilterValues,
  getStatusFilterValues,
  clearFilters,
  defaultState,
  defaultPropTypes
} from './filterValues';

/**
 * Class representing Dashboard Page
 * @class
 */
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(table);
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

  renderPagination = () => {
    const { perPage } = this.state;
    const { pagination, filter, fellows } = this.props;
    return (
      <Pagination
        totalPages={pagination.pages}
        perPage={perPage}
        onPerPageChange={this.onChange}
        handlePageChange={this.handlePageChange}
        handleValueChange={this.handleValueChange}
        currentPage={pagination.page}
        filter={filter}
        hasFellows={fellows.length > 0}
      />
    );
  };

  handlePageChange = url => {
    const { getFellows } = this.props;
    getFellows({ url });
  };

  handleValueChange = page => {
    const { perPage } = this.state;
    const { filter, getFellows } = this.props;
    getFellows({ perPage, page, filter });
  };

  handleSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  getCriteriaFilter = (type, value) => {
    const { status } = this.state;
    this.setState(getCriteriaFilterValues(type, value, table, status));
  };

  getStatusFilter = (type, value) => {
    const {
      loading,
      pagination: { perPage },
      getFellows
    } = this.props;
    const { search, level, criteria } = this.state;
    if (!loading) {
      getFellows({
        perPage,
        search,
        statusType: criteria,
        status: value,
        level
      });
    }
    this.setState(getStatusFilterValues(type, value, table, criteria));
  };

  getLevelFilter = (type, value) => {
    const {
      loading,
      pagination: { perPage },
      getFellows
    } = this.props;
    const { search, status, criteria } = this.state;
    if (!loading) {
      getFellows({
        perPage,
        search,
        statusType: criteria,
        status,
        level: value
      });
      this.setState({ level: value });
    }
  };

  downloadCsvPdf = (type, value) => {
    const { headers, cellKeys, criteria } = this.state;
    const { downloadFellows, status, level } = this.state;
    const {
      pagination: { results },
      loading
    } = this.props;
    if (value === 'as PDF' && !loading) {
      jsonToPdf(
        headers,
        cellKeys,
        criteria,
        status,
        level,
        downloadFellows,
        results
      );
    } else if (value === 'as CSV' && !loading) {
      jsonToCsv(true, headers, cellKeys, downloadFellows);
    }
  };

  clickDownload = () => {
    const { status, level } = this.state;
    const {
      pagination: { results }
    } = this.props;
    const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
    axios
      .get(
        `${serverURL}/api/v1/fellows?perPage=${results}&page=${1}&filter=${'all'}&level=${level}&status=${status}`
      )
      .then(res => {
        this.setState({ downloadFellows: res.data.payload });
      });
  };

  clearFilters = () => {
    const { loading, getFellows } = this.props;
    if (!loading) getFellows({ status: 'All', level: 'All' });
    this.setState(clearFilters());
  };

  renderDownloadButton() {
    return (
      <div
        className="download-button"
        onClick={this.clickDownload}
        onKeyPress={this.clickDownload}
        role="button"
        tabIndex={-1}
      >
        <FilterDropdown
          key="4"
          search={false}
          type="download"
          title=""
          items={['as PDF', 'as CSV']}
          current="Export"
          getFilter={this.downloadCsvPdf}
        />
      </div>
    );
  }

  renderFilter() {
    const { criteria, status, level, search } = this.state;
    const {
      getFellows,
      filter,
      fellows,
      pagination: { perPage, results }
    } = this.props;

    return (
      <Fragment>
        <Filters
          criteria={criteria}
          status={status}
          level={level}
          getCriteriaFilter={this.getCriteriaFilter}
          getLevelFilter={this.getLevelFilter}
          getStatusFilter={this.getStatusFilter}
        />
        <div>
          <SearchBar
            results={results}
            getFellows={getFellows}
            perPage={perPage}
            filter={filter}
            search={search}
            handleSearchChange={this.handleSearchChange}
          />
        </div>
        {fellows.length !== 0 ? this.renderDownloadButton() : null}
      </Fragment>
    );
  }

  renderResultCount = () => {
    const {
      pagination: { results }
    } = this.props;
    const resultTerm = results > 1 ? 'Fellows' : 'Fellow';
    return (
      <div className="result-count">
        <span className="border-bottom mr-2 pb-2">{results || 0}</span>
        <span className="mr-3">{`Total ${resultTerm} (Filtered)`}</span>
        <FilterButton clearFilters={this.clearFilters} />
      </div>
    );
  };

  renderPageBody() {
    const { fellows, loading } = this.props;
    const { headers, cellKeys } = this.state;
    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Fragment>
          <div className="filters--dev">{this.renderFilter()}</div>
          {this.renderResultCount()}
          <DashboardTable
            headers={headers}
            fellows={fellows}
            loading={loading}
            cellValues={cellKeys}
          />
        </Fragment>
      </ErrorBoundary>
    );
  }

  render() {
    const { error } = this.props;
    const { ErrorPage } = Error;
    return (
      <div>
        {error ? <ErrorPage /> : this.renderPageBody()}
        <div> {this.renderPagination()} &nbsp; </div>
      </div>
    );
  }
}
export default DashboardPage;

DashboardPage.defaultProps = {
  summary: { onTrack: 0, gteWk5OffTrack: 0, ltWk5OffTrack: 0 },
  error: ''
};

DashboardPage.propTypes = defaultPropTypes;
