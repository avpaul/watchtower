import initialState from './initialState';

import * as types from '../constants/cadreCertificationTypes';

export default (state = initialState.getCertification, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_CERTIFICATION_SUCCESS:
      return {
        error: null,
        loading: false,
        data: {
          ...state.data,
          [action.data.id]: action.data
        }
      };
    case types.GET_CERTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
