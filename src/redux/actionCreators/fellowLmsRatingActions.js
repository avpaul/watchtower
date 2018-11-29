import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowLmsRatings';

const getFellowLmsRatings = email => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_LMS_RATINGS_REQUEST });

  const url = `${
    process.env.REACT_APP_WATCHTOWER_SERVER
  }/api/v1/fellow/lms?email=${email}`;
  return axios.get(url).then(
    response =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_RATINGS_SUCCESS,
        lmsRatings: response.data
      }),
    error =>
      dispatch({
        type: types.LOAD_FELLOW_LMS_RATINGS_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowLmsRatings;
