import { combineReducers } from 'redux';

import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import managerReducer from './managerReducer';
import visibilityFilter from './visibilityFilter';
import fellowProgressReducer from './fellowProgressReducer';
import ttlReducer from './ttlReducer';
import locationReducer from './locationReducer';
import opsDashboardReducer from './opsDashBoardReducer';
import managerFellowReducer from './managerFellows';

const rootReducer = combineReducers({
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter,
  managers: managerReducer,
  fellowsProgress: fellowProgressReducer,
  ttls: ttlReducer,
  locations: locationReducer,
  opsDashboard: opsDashboardReducer,
  managerFellows: managerFellowReducer
});

export default rootReducer;
