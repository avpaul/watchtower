import { combineReducers } from 'redux';

import fellowReducer from './fellowReducer';
import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  fellows: fellowReducer,
  fellowCountHistory: fellowCountHistoryReducer,
  visibilityFilter
});
export default rootReducer;
