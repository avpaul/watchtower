import { combineReducers } from 'redux';

import emsDashboardReducer from './emsDashBoardReducer';
import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import managerReducer from './managerReducer';
import visibilityFilter from './visibilityFilter';
import fellowProgressReducer from './fellowProgressReducer';
import ttlReducer from './ttlReducer';
import locationReducer from './locationReducer';
import opsDashboardReducer from './opsDashBoardReducer';
import managerFellowReducer from './managerFellows';
import ttlProjectsReducer from './ttlProjectsReducer';
import fellowProfileDataReducer from './fellowProfileDataReducer';
import fellowsSummary from './fellowsummary';
import fellowNotificationReducer from './fellowNotificationReducer';
import fellowUnreadNotificationReducer from './fellowUnreadNotificationReducer';
import fellowReadNotificationReducer from './fellowReadNotificationReducer';
import fellowLmsSubmissionsReducer from './fellowLmsSubmissionsReducer';
import emsSimsLeadsReducers from './emsSimsLeadsReducers';
import lfNotificationReducer from './lfNotificationReducer';
import ttlNotificationReducer from './ttlNotificationReducer';
import updateManagerNotification from './managerNotificationReducer';
import managerFellowsSummary from './managerFellowsSummaryReducer';
import managersFeedbackReducer from './managerFeedbackReducer';
import fellowDevPulseReducer from './fellowDevPulseReducer';
import fellowFeedbackReducer from './fellowFeedbackReducer';

const rootReducer = combineReducers({
  emsDashboard: emsDashboardReducer,
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
  fellow: fellowProfileDataReducer,
  notification: fellowNotificationReducer,
  unreadnotification: fellowUnreadNotificationReducer,
  readnotification: fellowReadNotificationReducer,
  fellowDevPulse: fellowDevPulseReducer,
  fellowLmsSubmissions: fellowLmsSubmissionsReducer,
  fellowsSummary,
  engineeringManagerSimsLeads: emsSimsLeadsReducers,
  lfNotification: lfNotificationReducer,
  ttlNotification: ttlNotificationReducer,
  updateManagerNotification,
  managerFellowsSummary,
  feedback: managersFeedbackReducer,
  fellowFeedback: fellowFeedbackReducer
});

export default rootReducer;
