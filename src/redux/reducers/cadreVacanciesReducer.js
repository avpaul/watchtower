import initialState from './initialState';
import * as types from '../constants/cadreVacanciesTypes';
import genericReducer from './genericReducer';

const getAProjectReducer = (state = initialState.cadreVacancies, action) =>
  genericReducer(
    [
      types.FETCH_CADREVACANCIES_REQUEST,
      types.FETCH_CADREVACANCIES_SUCCESS,
      types.FETCH_CADREVACANCIES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default getAProjectReducer;
