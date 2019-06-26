import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import DATA_PAGINATE_META_DATA from '../../constants/paginateTypes';
import { $page, $perPage } from '../paginate';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('should test pagination actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should set page number', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 5
        }
      }
    ];
    store.dispatch($page(5, 10));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should set page to 1 if page is < 1', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 1
        }
      }
    ];
    store.dispatch($page(-4, 10));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should subtract 1 from pageTotal if page is > pageTotal', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 9
        }
      }
    ];
    store.dispatch($page(15, 10));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should set page size to 10 if perPage < 1', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 1,
          perPage: 10
        }
      }
    ];
    store.dispatch($perPage(-5));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should set page size to 100 if perPage > 100', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 1,
          perPage: 100
        }
      }
    ];
    store.dispatch($perPage(150));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it('should set page size', done => {
    const expectedAction = [
      {
        type: DATA_PAGINATE_META_DATA,
        meta: {
          page: 1,
          perPage: 10
        }
      }
    ];
    store.dispatch($perPage(10));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });
});
