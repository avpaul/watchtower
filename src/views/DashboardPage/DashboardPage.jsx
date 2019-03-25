import React, { Component, Fragment } from 'react';
import 'jspdf-autotable';
import jsonToCsv from '../../utils/jsonToCsv';
import jsonToPdf from '../../utils/jsonToPdf';
import DashboardTable from '../../components/DashboardTable';
import Error from '../../components/Error';
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
  defaultPropTypes,
  filterFellows
} from './filterValues';
import PaginationFrontendWrapper from '../../components/Pagination/PaginationWrapper';

/**
 * Class representing Dashboard Page
 * @class
 */
export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState(table);
  }

  componentDidMount() {
    const { getFellows, filter } = this.props;
    getFellows({ filter, perPage: 'all' });
  }

  componentDidUpdate(prevProps) {
    const { fellows } = this.props;
    if (prevProps.fellows && prevProps.fellows !== fellows)
      this.updateFellows(fellows);
  }

  updateFellows = fellows => {
    const { paginationWrapper } = this.props;
    this.setState({ filteredFellows: fellows }, () =>
      paginationWrapper.updateData(fellows)
    );
  };

  filterFellows = () => {
    const { search, level, criteria, statusType, status } = this.state;
    const { fellows } = this.props;
    const filters = { search, level, statusType, criteria, status };
    this.updateFellows(filterFellows(fellows, filters));
  };

  getCriteriaFilter = (type, value) => {
    const { status } = this.state;
    this.setState(
      getCriteriaFilterValues(type, value, table, status),
      this.filterFellows
    );
  };

  getStatusFilter = (type, value) => {
    const { criteria } = this.state;
    this.setState(
      getStatusFilterValues(type, value, table, criteria),
      this.filterFellows
    );
  };

  getLevelFilter = (type, value) =>
    this.setState({ level: value }, this.filterFellows);

  downloadCsvPdf = (type, value) => {
    const { headers, cellKeys, criteria } = this.state;
    const { downloadFellows, status, level } = this.state;
    const {
      pagination: { results },
      loading
    } = this.props;

    if (value === 'as PDF' && !loading && !!downloadFellows.length) {
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
    const {
      paginationWrapper: {
        state: { paginatedData }
      }
    } = this.props;
    this.setState({ downloadFellows: paginatedData });
  };

  clearFilters = () => this.setState(clearFilters(), this.filterFellows);

  handleSearchBarChange = ({ search }) =>
    this.setState({ search }, this.filterFellows);

  handleSearchInputChange = event =>
    this.setState({ search: event.target.value }, this.filterFellows);

  renderSearchBar = () => {
    const { search } = this.state;
    const {
      paginationWrapper: {
        state: { paginationFilter: filter }
      }
    } = this.props;
    return (
      <SearchBar
        getFellows={this.handleSearchBarChange}
        perPage={filter.perPage}
        filter={filter}
        search={search}
        handleSearchChange={this.handleSearchInputChange}
      />
    );
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
    const { criteria, status, level } = this.state;
    const {
      paginationWrapper: {
        state: { paginatedData }
      }
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
        <div>{this.renderSearchBar()}</div>
        {paginatedData.length !== 0 ? this.renderDownloadButton() : null}
      </Fragment>
    );
  }

  renderResultCount = () => {
    const { filteredFellows } = this.state;
    const resultTerm = filteredFellows.length > 1 ? 'Fellows' : 'Fellow';
    return (
      <div className="result-count">
        <span className="border-bottom mr-2 pb-2">
          {filteredFellows.length || 0}
        </span>
        <span className="mr-3">{`Total ${resultTerm} (Filtered)`}</span>
        <FilterButton clearFilters={this.clearFilters} />
      </div>
    );
  };

  renderPageBody() {
    const {
      loading,
      paginationWrapper: {
        state: { paginatedData }
      }
    } = this.props;
    const { headers, cellKeys } = this.state;
    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Fragment>
          <div className="filters--dev">{this.renderFilter()}</div>
          {this.renderResultCount()}
          <DashboardTable
            headers={headers}
            fellows={paginatedData}
            loading={loading}
            cellValues={cellKeys}
          />
        </Fragment>
      </ErrorBoundary>
    );
  }

  render() {
    const { error, paginationWrapper } = this.props;
    const { ErrorPage } = Error;
    return (
      <div>
        {error ? <ErrorPage /> : this.renderPageBody()}
        <div className="mb-5">{paginationWrapper.renderPagination()}</div>
      </div>
    );
  }
}

DashboardPage.defaultProps = {
  summary: { onTrack: 0, gteWk5OffTrack: 0, ltWk5OffTrack: 0 },
  error: ''
};

DashboardPage.propTypes = defaultPropTypes;

const PaginationWrapped = props => (
  <PaginationFrontendWrapper component={<DashboardPage {...props} />} />
);

export default PaginationWrapped;
