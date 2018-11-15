import { combineReducers } from 'redux';

import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import managerReducer from './managerReducer';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter,
  managers: managerReducer
});
export default rootReducer;
