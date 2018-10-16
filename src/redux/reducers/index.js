import { combineReducers } from 'redux';
import test from './testReducer';

// Import your reducers and add to the combineReducers to compose
// rootReducer e.g combineReducers({ reducer });
const rootReducer = combineReducers({ test });

export default rootReducer;
