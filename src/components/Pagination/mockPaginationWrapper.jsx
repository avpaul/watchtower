const mockPaginationWrapper = {
  state: {
    paginationFilter: {
      perPage: 25,
      page: 1,
      totalPages: 0
    },
    paginatedData: [],
    filteredData: []
  },
  updateData: () => {},
  paginateData: () => {},
  processData: () => {},
  handlePaginationPageChange: () => {},
  renderPagination: () => {}
};

export default mockPaginationWrapper;
