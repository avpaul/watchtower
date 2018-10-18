import { ONTRACK } from '../constants/fellowFilters';

export default {
  fellows: {
    pagination: {
      perPage: 10,
      page: 1,
      pages: 1,
      firstPageURL: '',
      nextPageURL: '',
      prevPageURL: '',
      finalPageURL: '',
    },
    fellows: [],
    loading: false,
    error: '',
  },
  visibilityFilter: ONTRACK,
};
