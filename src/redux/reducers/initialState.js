import { ALL } from '../constants/fellowFilters';

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
  visibilityFilter: ALL,
  fellowCountHistory: {
    countSummary: {},
    loading: false
  },
  fellowsProgress: {
    loading: false,
    data: {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    },
    error: null
  },
  fellowDevPulse: {
    loading: false,
    ratings: [],
    averageRatings: {
      communication: 'N/A',
      integration: 'N/A',
      quantity: 'N/A',
      quality: 'N/A',
      professionalism: 'N/A',
      initiative: 'N/A'
    },
    error: null
  },
  fellowLmsSummary: {
    loading: false,
    lmsSummary: [],
    error: null
  },
  fellowLmsSubmissions: {
    loading: false,
    lmsSubmissions: [],
    error: null
  },
  ttls: {
    loading: false,
    ttls: [],
    error: null
  },
  ttlProjects: {
    loading: false,
    projects: [],
    error: null
  },
  locations: {
    loading: false,
    locations: [],
    error: null
  },
  managers: {
    ttls: [],
    lfs: [],
    averageFellowsPerTtl: 0,
    averageFellowsPerLf: 0,
    loading: false
  },
  managerFellows: {
    loading: false,
    managerFellows: {},
    error: ''
  },
  fellow: {
    loading: false,
    fellow: {},
    error: ''
  },
  notification: {
    loading: false,
    notification: {},
    error: ''
  },
  unreadnotification: {
    loading: false,
    unreadnotification: {},
    error: ''
  },
  readnotification: {
    loading: false,
    readnotification: {},
    error: ''
  },
  fellowsSummary: {
    loading: false,
    fellowsSummaryToday: {},
    fellowsSummaryTrend: {},
    data: {},
    error: ''
  },
  opsDashboard: {
    fellowsSummary: {
      loading: false,
      fellowsSummaryToday: {},
      fellowsSummaryTrend: {},
      data: {
        allFellowsCount: 0,
        D0AFellowsCount: 0,
        D0BFellowsCount: 0
      },
      error: ''
    }
  },
  fellowLmsRatings: {
    loading: false,
    data: {},
    error: null
  },
  engineeringManagerTtls: {
    loading: false,
    data: [],
    error: null
  }
};
