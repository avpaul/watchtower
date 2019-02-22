import React from 'react';
import enzyme from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import FellowsProgressBar from '../FellowsProgressBar';

describe('Fellows Progress Bar test', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ fellowsProgress: {}, locations: {} });
  test('it renders the Fellows Progress bar without crashing', () => {
    expect(() =>
      enzyme.shallow(<FellowsProgressBar store={store} />)
    ).not.toThrow();
  });
});
