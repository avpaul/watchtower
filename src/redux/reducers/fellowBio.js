import initialState from './initialState';
import {
  LOAD_FELLOWBIO_REQUEST,
  LOAD_FELLOWBIO_SUCCESS,
  LOAD_FELLOWBIO_FAILURE
} from '../constants/fellowBioTypes';

const fellowBioReducer = (state = initialState.fellow, action) => {
  switch (action.type) {
    case LOAD_FELLOWBIO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_FELLOWBIO_SUCCESS:
      return {
        ...state,
        loading: false,
        fellow: action.fellow
      };

    case LOAD_FELLOWBIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default fellowBioReducer;
