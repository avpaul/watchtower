import { ALL } from '../constants/fellowFilters';

export default {
  emsDashboard: {
    fellowsSummary: {
      loading: false,
      summary: [],
      error: ''
    }
  },
  fellows: {
    pagination: {
      perPage: 25,
      page: 1,
      pages: 1,
      firstPageURL: '',
      nextPageURL: '',
      prevPageURL: '',
      finalPageURL: ''
    },
    fellows: [],
    summary: { fellowsofftrack: 0, gteWk5OffTrack: 0, fellowsontrack: 0 },
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
  fellowLmsSubmissions: {
    loading: false,
    lmsSubmissions: {},
    error: null
  },
  ttls: {
    loading: false,
    ttls: [],
    error: null
  },
  manager: {
    loading: false,
    data: [],
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
    notification: [],
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
  engineeringManagerSimsLeads: {
    loading: false,
    data: [],
    error: null
  },
  lfNotification: {
    loading: false,
    lfNotification: [],
    error: null
  },
  ttlNotification: {
    loading: false,
    ttlNotification: [],
    error: null
  },
  updateManagerNotification: {
    loading: false,
    managerNotification: [],
    error: null
  },
  managerFellowsSummary: {
    loading: false,
    data: [],
    error: null
  },
  feedback: {
    loading: false,
    data: [],
    error: null
  },
  fellowFeedback: {
    fellowFeedback: {}
  }
};
