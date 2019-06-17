import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import genericReducer from './genericReducer';

export default (state = initialState.fetchSlackChannels, action) =>
  genericReducer(
    [
      types.FETCH_SLACK_CHANNELS_REQUEST,
      types.FETCH_SLACK_CHANNELS_SUCCESS,
      types.FETCH_SLACK_CHANNELS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
