import initialState from './initialState';
import * as types from '../constants/projectsTypes';

const getAProjectReducer = (state = initialState.singleProject, action) => {
  switch (action.type) {
    case types.GET_SINGLE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_SINGLE_PROJECT_SUCCESS:
      return {
        error: null,
        loading: false,
        data: {
          ...state.data,
          [action.data.project[0].id]: action.data.project[0]
        }
      };
    case types.GET_SINGLE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default getAProjectReducer;
