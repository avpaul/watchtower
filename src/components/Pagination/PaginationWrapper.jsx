import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';

export default class PaginationFrontendWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginationFilter: {
        perPage: 25,
        page: 1,
        totalPages: 0
      },
      // eslint-disable-next-line react/no-unused-state
      paginatedData: [],
      filteredData: []
    };
  }

  updateData = (data, filters = {}) => {
    this.setState(
      state => ({
        filteredData: data,
        paginationFilter: {
          ...state.paginationFilter,
          ...filters,
          totalPages: Math.ceil(data.length / state.paginationFilter.perPage)
        }
      }),
      this.paginateData
    );
    return true;
  };

  paginateData = () => {
    const { paginationFilter, filteredData } = this.state;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      paginatedData: this.processData(filteredData, paginationFilter)
    });
  };

  /**
   * @description Filters the data records according to the current page
   * @param pagination Object that contains the values used to filter the data records eg.
   * current page, per page value
   */
  processData = (data, filters) => {
    const offset = (filters.page - 1) * filters.perPage;
    const upperBound = offset + filters.perPage;
    // Retrieves a sub array of the data according to current page and the page size set.
    const updatedData = data;
    return updatedData.slice(offset, upperBound);
  };

  /**
   * @description pagination buttons' onClick event handler
   * @param queryData pagination filters returned from the Pagination component
   */
  handlePaginationPageChange = queryData => {
    this.setState(
      state => ({
        paginationFilter: {
          perPage: queryData.perPage,
          page: queryData.page,
          totalPages: Math.ceil(state.filteredData.length / queryData.perPage)
        }
      }),
      this.paginateData
    );
  };

  renderPagination = () => {
    const { paginationFilter, filteredData } = this.state;
    return (
      <Pagination
        totalPages={paginationFilter.totalPages}
        handlePageChange={this.handlePaginationPageChange}
        handleValueChange={this.handlePaginationPageChange}
        currentPage={paginationFilter.page}
        perPage={paginationFilter.perPage}
        hasData={filteredData.length > 0}
      />
    );
  };

  render() {
    const { component } = this.props;
    return React.cloneElement(component, { paginationWrapper: this });
  }
}

PaginationFrontendWrapper.propTypes = {
  component: PropTypes.element.isRequired
};
