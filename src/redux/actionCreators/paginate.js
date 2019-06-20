import { INDEX_PAGE_SIZE_DEFAULT } from '../reducers/initialState';
import DATA_PAGINATE_META_DATA from '../constants/paginateTypes';

export const $perPage = (perPage = INDEX_PAGE_SIZE_DEFAULT) => dispatch => {
  if (perPage < 1) {
    perPage = 10; // eslint-disable-line no-param-reassign
  }
  if (perPage > 100) {
    perPage = 100; // eslint-disable-line no-param-reassign
  }

  return dispatch({
    type: DATA_PAGINATE_META_DATA,
    meta: {
      page: 1,
      perPage
    }
  });
};

export const $page = (page = 1, pageTotal) => dispatch => {
  if (page < 1) {
    page = 1; // eslint-disable-line no-param-reassign
  }

  if (page > pageTotal) {
    page = pageTotal - 1; // eslint-disable-line no-param-reassign
  }

  return dispatch({
    type: DATA_PAGINATE_META_DATA,
    meta: {
      page
    }
  });
};
