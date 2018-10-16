import initialState from './initialState';
import test from '../constants';

const testReducer = (state = initialState.test, action) => {
  switch (action.type) {
    case test.TEST_REDUCER:
      return 'test reducer working';
    default:
      return state;
  }
};

export default testReducer;
