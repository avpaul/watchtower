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
import fetchProjectsReducer, {
  withDeleteProject
} from './viewAllProjectsReducer';
import addProjectManager from './addProjectManagerReducer';
import addProjectTechnology from './addProjectTechnologyReducer';
import fetchProjectManagers from './getProjectManagersReducer';
import fetchProjectTechnologies from './getProjectTechnologiesReducer';
import cadreEngineersReducer from './cadreEngineersReducer';
import fetchEngineerReportReducer from './engineersReportReducer';
import fetchSlackChannels from './slackChannelReducer';
import cadreProjectRolereducer, {
  withDeleteProjectRole,
  fetchSingleRoleReducer
} from './cadreProjectRoleReducer';
import fetchCertificationsReducer, {
  fetchCertificationsApplicantsReducer,
  fetchCertifiedEngineers
} from './cadreCertificationReducer';
import fellowActiveRoleReducer from './fellowActiveRoleReducer';
import createProjectVacancies from './createProjectVacanciesReducer';
import cadreVacancies from './cadreVacanciesReducer';
import editProjectReducer from './editProjectReducer';
import getAProjectReducer from './getAProjectReducer';
import createRoleReducer from './createRoleReducer';
import getRoleSkillsReducer from './getRoleSkillsReducer';
import getAllVacancies, {
  fetchVacanciesWithNotCycleIdReducer
} from './getAllVacanciesReducer';
import editCertification from './opsEditCertificationReducer';
import cadreAddCertificationReducer from './cadreAddCertificationReducer';
import getCertificationReducer from './getCertificationReducer';
import editProjectVacancies from './editProjectVacanciesReducer';
import deleteProjectVacancies from './deleteProjectVacanciesReducer';
import deleteCertificationVacancies from './deleteCertificationVacanciesReducer';
import projectVacanciesOnFocus from './setProjectVacanciesOnFocusReducer';
import certificationOnFocus from './setCertificationOnFocusReducer';
import deleteCertification from './deleteCertificationReducer';
import createCertificactionVacancies from './createCertificationVacanciesReducer';
import applyForRoleReducer from './applyForRoleReducer';
import teamManagerProjectApplicationsReducer from './cadreTeamManager/applicationsReducer';
import teamManagerTeamReducer from './teamManagerReducer';

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
  allProjects: withDeleteProject(fetchProjectsReducer),
  addProjectManager,
  addProjectTechnology,
  fetchProjectManagers,
  fetchProjectTechnologies,
  cadreEngineers: cadreEngineersReducer,
  reports: fetchEngineerReportReducer,
  fetchSlackChannels,
  allRoles: withDeleteProjectRole(cadreProjectRolereducer),
  allCertifications: fetchCertificationsReducer,
  certifications: cadreAddCertificationReducer,
  fetchActiveRole: fellowActiveRoleReducer,
  createProjectVacancies,
  editSingleProject: editProjectReducer,
  singleProject: getAProjectReducer,
  createRole: createRoleReducer,
  roleSkills: getRoleSkillsReducer,
  getAllVacancies,
  cadreVacancies,
  editCertification,
  getCertification: getCertificationReducer,
  editProjectVacancies,
  deleteProjectVacancies,
  deleteCertificationVacancies,
  projectVacanciesOnFocus,
  deleteCertification,
  certificationOnFocus,
  createCertificactionVacancies,
  certificationApplicants: fetchCertificationsApplicantsReducer,
  apply: applyForRoleReducer,
  singleRole: fetchSingleRoleReducer,
  teamManagerProjectApplications: teamManagerProjectApplicationsReducer,
  teamManagerTeamMembers: teamManagerTeamReducer,
  cadreVacanciesWithNoCycleId: fetchVacanciesWithNotCycleIdReducer,
  certifiedEngineers: fetchCertifiedEngineers
});

export default rootReducer;
