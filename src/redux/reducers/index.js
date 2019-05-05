import { combineReducers } from 'redux';

import emsDashboardReducer from './emsDashBoardReducer';
import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import opsSummaryReducer from './opsSummaryReducer';
import visibilityFilter from './visibilityFilter';
import fellowProgressReducer from './fellowProgressReducer';
import opsDashboardReducer from './opsDashBoardReducer';
import managerFellowReducer from './managerFellows';
import managerProfileReducer from './managerProfileReducer';
import fellowProfileDataReducer from './fellowProfileDataReducer';
import fellowsSummary from './fellowsummary';
import fellowNotificationReducer from './fellowNotificationReducer';
import fellowUnreadNotificationReducer from './fellowUnreadNotificationReducer';
import fellowReadNotificationReducer from './fellowReadNotificationReducer';
import fellowLmsSubmissionsReducer from './fellowLmsSubmissionsReducer';
import emsSimsLeadsReducers from './emsSimsLeadsReducers';
import updateManagerNotification from './managerNotificationReducer';
import managerFellowsSummary from './managerFellowsSummaryReducer';
import managersFeedbackReducer from './managerFeedbackReducer';
import engineersOnpip from './activatePipReducer';
import fellowDevPulseReducer from './fellowDevPulseReducer';
import fellowFeedbackReducer from './fellowFeedbackReducer';

const rootReducer = combineReducers({
  emsDashboard: emsDashboardReducer,
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter,
  opsSummary: opsSummaryReducer,
  fellowsProgress: fellowProgressReducer,
  opsDashboard: opsDashboardReducer,
  managerFellows: managerFellowReducer,
  manager: managerProfileReducer,
  fellow: fellowProfileDataReducer,
  notification: fellowNotificationReducer,
  unreadnotification: fellowUnreadNotificationReducer,
  readnotification: fellowReadNotificationReducer,
  fellowDevPulse: fellowDevPulseReducer,
  fellowLmsSubmissions: fellowLmsSubmissionsReducer,
  fellowsSummary,
  engineeringManagerSimsLeads: emsSimsLeadsReducers,
  updateManagerNotification,
  managerFellowsSummary,
  feedback: managersFeedbackReducer,
  fellowFeedback: fellowFeedbackReducer,
  pipData: engineersOnpip
});

export default rootReducer;
