import axios from 'axios';
import errorHandler from '../../services/errorHandler';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

/**
 * A generic action creator for making a request
 * @param array actionTypes A list of actionTypes
 * @param object axiosConfig Axios configurations
 * @return object An instance of a Promise
 */
const genericAPIRequest = (
  actionTypes,
  axiosConfig,
  onSuccess = () => {},
  onFailure = () => {}
) => dispatch => {
  dispatch({ type: actionTypes[0] });
  return axios(axiosConfig)
    .then(response => {
      dispatch({
        type: actionTypes[1],
        data: response.data.data || response.data
      });
      onSuccess(dispatch, response);
    })
    .catch(error => {
      dispatch({
        type: actionTypes[2],
        error: errorHandler(error)
      });
      onFailure(dispatch, error);
    });
};

/**
 * A generic action creator for making post requests
 * @param string The url path to make the request to
 * @param array actionTypes A list of action types
 * @param object postData A list of action types
 * @return object An instance of a Promise
 */
export const genericAPIPostRequest = (
  url,
  actionTypes,
  postData,
  onSuccess = () => {}
) => {
  console.log(postData);
  return genericAPIRequest(
    actionTypes,
    {
      method: 'POST',
      url: `${serverURL}/api/v2/${url}`,
      data: postData
    },
    onSuccess
  );
};

/**
 * A generic action creator for making GET requests
 * @param string The url path to make the request to
 * @param array actionTypes A list of action types
 * @return object An instance of a Promise
 */
export const genericAPIGetRequest = (url, actionTypes) =>
  genericAPIRequest(actionTypes, {
    method: 'GET',
    url: `${serverURL}/api/v2/${url}`
  });

/**
 * Serialize the query parameters
 * @param  {object} query
 * @return {object}
 */
export const serializeQuery = query =>
  Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');

/**
 * A generic action creator for making PUT requests
 * @param string The url path to make the request to
 * @param array actionTypes A list of action types
 * @return object An instance of a Promise
 */
export const genericAPIPutRequest = (
  url,
  actionTypes,
  putData,
  onSuccess = () => {}
) =>
  genericAPIRequest(
    actionTypes,
    {
      method: 'PUT',
      url: `${serverURL}/api/v2/${url}`,
      data: putData
    },
    onSuccess
  );

/**
 * A generic action creator for making DELETE requests
 * @param string The url path to make the request to
 * @param array actionTypes A list of action types
 * @return object An instance of a Promise
 */
export const genericAPIDeleteRequest = (
  url,
  actionTypes,
  onSuccess = () => {}
) =>
  genericAPIRequest(
    actionTypes,
    {
      method: 'DELETE',
      url: `${serverURL}/api/v2/${url}`
    },
    onSuccess
  );

export default {
  genericAPIPostRequest,
  genericAPIGetRequest,
  genericAPIPutRequest,
  genericAPIDeleteRequest
};
