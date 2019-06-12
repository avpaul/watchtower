import initialState from './initialState';
import {
  LOAD_D1_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_D1_FELLOW_PROFILE_DATA_FAILURE
} from '../constants/d1FellowProfileDataTypes';

const d1FellowBioReducer = (state = initialState.fellow, action) => {
  switch (action.type) {
    case LOAD_D1_FELLOW_PROFILE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        fellow: action.fellow
      };

    case LOAD_D1_FELLOW_PROFILE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default d1FellowBioReducer;
