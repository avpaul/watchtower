import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../../components/SearchBar/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import Filters from './Filters/Filters';

/**
 * Returns a list of distinct cohorts for a group of fellows
 * @param array fellows
 * @return array List of distinct cohorts
 */
const getFellowsCohort = fellows => {
  const cohortList = [];

  fellows.forEach(fellow => {
    if (fellow.cohort && !cohortList.find(cohort => cohort === fellow.cohort)) {
      cohortList.push(fellow.cohort);
    }
  });

  return cohortList.sort();
};

const renderSearchBar = (search, onSearchBarChange) => (
  <SearchBar
    search={search}
    handleSearchChange={event =>
      onSearchBarChange({ search: event.target.value })
    }
  />
);

const renderDownloadButton = (onDownloadDropdownClick, onDownloadClick) => (
  <div
    className="download-button"
    onClick={onDownloadDropdownClick}
    onKeyPress={onDownloadDropdownClick}
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
      getFilter={onDownloadClick}
    />
  </div>
);

const DashboardFilters = ({
  filters: { criteria, status, level, cohort, search },
  getFilter,
  fellows,
  onDownloadDropdownClick,
  onDownloadClick,
  onSearchBarChange
}) => (
  <Fragment>
    <Filters
      values={{ criteria, status, level, cohort }}
      options={{ cohort: ['All', ...getFellowsCohort(fellows)] }}
      handlers={{
        criteria: getFilter,
        status: getFilter,
        level: getFilter,
        cohort: getFilter
      }}
    />
    {renderSearchBar(search, onSearchBarChange)}
    {fellows.length !== 0
      ? renderDownloadButton(onDownloadDropdownClick, onDownloadClick)
      : null}
  </Fragment>
);

DashboardFilters.propTypes = {
  filters: PropTypes.shape.isRequired,
  getFilter: PropTypes.func.isRequired,
  onDownloadDropdownClick: PropTypes.func.isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  onSearchBarChange: PropTypes.func.isRequired,
  fellows: PropTypes.instanceOf(Array).isRequired
};

export default DashboardFilters;
