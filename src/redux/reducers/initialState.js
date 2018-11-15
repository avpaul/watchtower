import { OFFTRACK_WK5_PLUS } from '../constants/fellowFilters';

export default {
  fellows: {
    pagination: {
      perPage: 10,
      page: 1,
      pages: 1,
      firstPageURL: '',
      nextPageURL: '',
      prevPageURL: '',
      finalPageURL: ''
    },
    fellows: [],
    summary: { ltWk5OffTrack: 0, gteWk5OffTrack: 0, onTrack: 0 },
    loading: false,
    error: ''
  },
  visibilityFilter: OFFTRACK_WK5_PLUS,
  fellowCountHistory: {
    countSummary: {},
    loading: false,
    error: null
  },
  managers: {
    ttls: [],
    lfs: [],
    averageFellowsPerTtl: 0,
    averageFellowsPerLf: 0,
    loading: false,
    error: ''
  }
};
