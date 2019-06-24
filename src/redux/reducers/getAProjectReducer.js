import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

const getAProjectReducer = (state = initialState.singleProject, action) =>
  genericReducer(
    [
      types.GET_SINGLE_PROJECT_REQUEST,
      types.GET_SINGLE_PROJECT_SUCCESS,
      types.GET_SINGLE_PROJECT_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default getAProjectReducer;
