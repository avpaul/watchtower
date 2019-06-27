import { combineReducers } from 'redux';

import emsDashboardReducer from './emsDashBoardReducer';
import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import opsSummaryReducer from './opsSummaryReducer';
import visibilityFilter from './visibilityFilter';
import fellowProgressReducer from './fellowProgressReducer';
import managerFellowReducer from './managerFellows';
import managerProfileReducer from './managerProfileReducer';
import fellowProfileDataReducer from './fellowProfileDataReducer';
import d1FellowProfileDataReducer from './d1FellowProfileDataReducer';
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
import performanceData from './performanceDataReducer';
import fellowPrePipFeedbackReducer from './fellowPrePipFeedbackReducer';
import fellowPipFeedbackReducer from './fellowPipFeedbackReducer';
import pipDeactivation from './pipDeactivationReducer';
import createProject from './createProjectReducer';
import fetchProjectsReducer from './viewAllProjectsReducer';
import addProjectManager from './addProjectManagerReducer';
import addProjectTechnology from './addProjectTechnologyReducer';
import fetchProjectManagers from './getProjectManagersReducer';
import fetchProjectTechnologies from './getProjectTechnologiesReducer';
import cadreEngineersReducer from './cadreEngineersReducer';
import fetchEngineerReportReducer from './engineersReportReducer';
import fetchSlackChannels from './slackChannelReducer';
import cadreProjectRolereducer from './cadreProjectRoleReducer';
import fellowActiveRoleReducer from './fellowActiveRoleReducer';
import createProjectVacancies from './createProjectVacanciesReducer';

const rootReducer = combineReducers({
  emsDashboard: emsDashboardReducer,
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter,
  opsSummary: opsSummaryReducer,
  fellowsProgress: fellowProgressReducer,
  managerFellows: managerFellowReducer,
  manager: managerProfileReducer,
  fellow: fellowProfileDataReducer,
  d1Fellow: d1FellowProfileDataReducer,
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
  pipData: engineersOnpip,
  performanceData,
  fellowPrePipFeedback: fellowPrePipFeedbackReducer,
  fellowPipFeedback: fellowPipFeedbackReducer,
  pipDeactivation,
  createProject,
  allProjects: fetchProjectsReducer,
  addProjectManager,
  addProjectTechnology,
  fetchProjectManagers,
  fetchProjectTechnologies,
  cadreEngineers: cadreEngineersReducer,
  reports: fetchEngineerReportReducer,
  fetchSlackChannels,
  allRoles: cadreProjectRolereducer,
  fetchActiveRole: fellowActiveRoleReducer,
  createProjectVacancies
});

export default rootReducer;
