import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';

export default (state = initialState.certificationOnFocus, action) => {
  switch (action.type) {
    case types.SET_CERTIFICATION_ON_FOCUS: {
      return action.data;
    }
    default:
      return state;
  }
};
