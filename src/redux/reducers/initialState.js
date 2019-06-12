import { ALL } from '../constants/fellowFilters';

const genericAPIState = {
  loading: false,
  data: [],
  error: null
};

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
      D0A: [],
      D0B: [],
      D0: []
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
  manager: {
    loading: false,
    data: {},
    error: null
  },
  opsSummary: {
    data: {
      managers: {
        ttls: [],
        lfs: [],
        averageFellowsPerTtl: 0,
        averageFellowsPerLf: 0
      },
      fellowsCount: {
        Total: 0
      },
      locations: []
    },
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
  engineeringManagerSimsLeads: {
    loading: false,
    data: {
      managers: {},
      locations: []
    },
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
    feedback: [],
    fellowFeedback: {}
  },
  pipData: {
    data: {},
    loading: false,
    error: null
  },
  performanceData: {
    loading: false,
    data: {
      today: {},
      trend: {}
    },
    error: ''
  },
  fellowPipFeedback: {
    loading: false,
    feedback: [],
    error: null
  },
  fellowPrePipFeedback: {
    loading: false,
    feedback: [],
    error: null
  },
  pipDeactivation: {
    success: null
  },
  createProject: genericAPIState,
  fetchAllProjects: genericAPIState,
  fetchProjectManagers: genericAPIState,
  fetchProjectTechnologies: genericAPIState,
  addProjectManager: {
    manager: {}
  },
  addProjectTechnology: {
    technology: ''
  }
};
