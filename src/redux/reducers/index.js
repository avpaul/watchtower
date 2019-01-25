import { combineReducers } from 'redux';

import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import managerReducer from './managerReducer';
import visibilityFilter from './visibilityFilter';
import fellowProgressReducer from './fellowProgressReducer';
import ttlReducer from './ttlReducer';
import locationReducer from './locationReducer';
import fellowLmsRatingsReducer from './fellowLmsRatingsReducer';
import opsDashboardReducer from './opsDashBoardReducer';
import managerFellowReducer from './managerFellows';
import ttlProjectsReducer from './ttlProjectsReducer';
import fellowBioReducer from './fellowBio';
import fellowDevPulseReducer from './fellowDevPulseReducer';
import fellowsSummary from './fellowsummary';
import fellowNotificationReducer from './fellowNotificationReducer';
import fellowUnreadNotificationReducer from './fellowUnreadNotificationReducer';
import fellowReadNotificationReducer from './fellowReadNotificationReducer';
import fellowLmsSummaryReducer from './fellowLmsSummaryReducer';
import fellowLmsSubmissionsReducer from './fellowLmsSubmissionsReducer';
import engineeringManagerTtlsReducer from './engineeringManagerTtlsReducer';

const rootReducer = combineReducers({
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter,
  managers: managerReducer,
  fellowsProgress: fellowProgressReducer,
  ttls: ttlReducer,
  locations: locationReducer,
  opsDashboard: opsDashboardReducer,
  managerFellows: managerFellowReducer,
  ttlProjects: ttlProjectsReducer,
  fellow: fellowBioReducer,
  notification: fellowNotificationReducer,
  unreadnotification: fellowUnreadNotificationReducer,
  readnotification: fellowReadNotificationReducer,
  fellowLmsRatings: fellowLmsRatingsReducer,
  fellowDevPulse: fellowDevPulseReducer,
  fellowLmsSummary: fellowLmsSummaryReducer,
  fellowLmsSubmissions: fellowLmsSubmissionsReducer,
  fellowsSummary,
  engineeringManagerTtls: engineeringManagerTtlsReducer
});

export default rootReducer;
