import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for fetching all channels in the andela workspace
 * @return object An instance of a Promise
 */
export const fetchAllSlackChannels = () =>
  genericAPIGetRequest('slack/channels', [
    types.FETCH_SLACK_CHANNELS_REQUEST,
    types.FETCH_SLACK_CHANNELS_SUCCESS,
    types.FETCH_SLACK_CHANNELS_FAILURE
  ]);

export default {
  fetchAllSlackChannels
};
