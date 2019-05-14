import React, { Component } from 'react';
import 'jspdf-autotable';
import jsonToCsv from '../../utils/jsonToCsv';
import jsonToPdf from '../../utils/jsonToPdf';
import DashboardTable from '../../components/DashboardTable';
import Error from '../../components/Error';
import '../../components/Pagination/Pagination.css';
import './index.css';
import FilterButton from '../../components/Buttons/Button';
import table from './tableHeaders';
import DashboardFilters from './DashboardFilters';

import {
  getCriteriaFilterValues,
  getStatusFilterValues,
  defaultState,
  defaultPropTypes,
  filterFellows,
  formatFellows
} from './filterValues';
import PaginationFrontendWrapper from '../../components/Pagination/PaginationWrapper';

/**
 * Class representing Dashboard Page
 * @class
 */
export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedFellows: [],
      ...defaultState(table)
    };
  }

  componentDidMount() {
    const { getFellows, filter } = this.props;
    getFellows({ filter, perPage: 'all' });
  }

  componentDidUpdate(prevProps) {
    const { fellows } = this.props;
    if (prevProps.fellows && prevProps.fellows !== fellows) {
      const fetchedFellows = formatFellows(fellows);
      this.updateFellows(fetchedFellows);
      this.updateSortedFellows(fetchedFellows);
    }
  }

  updateFellows = fellows => {
    const { paginationWrapper } = this.props;
    this.setState({ filteredFellows: fellows }, () =>
      paginationWrapper.updateData(fellows)
    );
  };

  updateSortedFellows = (sortedFellows, afterUpdate = () => {}) =>
    this.setState({ sortedFellows }, afterUpdate);

  filterFellows = () => {
    const { filters, sortedFellows } = this.state;
    const fellows = filterFellows(sortedFellows, filters);
    this.updateFellows(fellows);
  };

  getFilter = (type, value) => {
    const { status, criteria } = this.state;
    const { loading } = this.props;
    if (loading) return;

    let values = {};

    if (type === 'criteria')
      values = getCriteriaFilterValues(value, table, criteria);
    if (type === 'status') values = getStatusFilterValues(value, table, status);

    this.setState(
      state => ({
        filters: {
          ...state.filters,
          statusType: values.statusType || state.filters.statusTypes,
          [type]: value
        },
        headers: values.headers || state.headers,
        cellKeys: values.cellKeys || state.cellKeys
      }),
      this.filterFellows
    );
  };

  downloadCsvPdf = (type, value) => {
    const { headers, cellKeys, filters, downloadFellows } = this.state;
    const {
      pagination: { results },
      loading
    } = this.props;

    if (value === 'as PDF' && !loading && !!downloadFellows.length) {
      jsonToPdf(
        headers,
        cellKeys,
        filters.criteria,
        filters.status,
        filters.level,
        downloadFellows,
        results
      );
    } else if (value === 'as CSV' && !loading) {
      jsonToCsv(true, headers, cellKeys, downloadFellows);
    }
  };

  clickDownload = () => {
    const { paginationWrapper } = this.props;
    this.setState({ downloadFellows: paginationWrapper.state.paginatedData });
  };

  clearFilters = () => {
    const { filters, headers, cellKeys } = defaultState(table);
    this.setState({ filters, headers, cellKeys }, this.filterFellows);
  };

  handleSearchBarChange = ({ search }) =>
    this.setState(
      state => ({ filters: { ...state.filters, search } }),
      this.filterFellows
    );

  renderFilter = () => {
    const { filters } = this.state;
    const { fellows } = this.props;
    return (
      <DashboardFilters
        filters={filters}
        getFilter={this.getFilter}
        fellows={fellows}
        onDownloadDropdownClick={this.clickDownload}
        onDownloadClick={this.downloadCsvPdf}
        onSearchBarChange={this.handleSearchBarChange}
      />
    );
  };

  renderResultCount = () => {
    const { filteredFellows } = this.state;
    const resultTerm = filteredFellows.length === 1 ? 'Fellow' : 'Fellows';
    return (
      <div className="ops-fellows__count">
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
    const { headers, cellKeys, filteredFellows } = this.state;
    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <div className="page-content ops-fellows container-fluid">
          <div className="ops-fellows__filters row">{this.renderFilter()}</div>
          {this.renderResultCount()}
          <DashboardTable
            headers={headers}
            fellows={filteredFellows}
            fellowsToDisplay={paginatedData}
            loading={loading}
            cellValues={cellKeys}
            handleSortingChange={this.updateFellows}
          />
        </div>
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
  summary: { fellowsofftrack: 0, fellowsontrack: 0, gteWk5OffTrack: 0 },
  error: ''
};

DashboardPage.propTypes = defaultPropTypes;

const PaginationWrapped = props => (
  <PaginationFrontendWrapper component={<DashboardPage {...props} />} />
);

export default PaginationWrapped;
