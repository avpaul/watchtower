import { combineReducers } from 'redux';

import fellowReducer from './fellowReducer';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  fellows: fellowReducer,
  visibilityFilter,
});
export default rootReducer;
