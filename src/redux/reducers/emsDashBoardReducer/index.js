import { combineReducers } from 'redux';
import fellowsSummaryReducer from './fellowsSummaryReducer';

export default combineReducers({ fellowsSummary: fellowsSummaryReducer });
