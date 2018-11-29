import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../../redux/reducers/initialState';

import FellowDashboard from '..';

describe('FellowDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Router>
          <FellowDashboard
            user={{ name: 'test', picture: 'http://' }}
            role="Fellow"
          />
        </Router>
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(FellowDashboard)
        .dive()
        .name()
    ).toBe('Route');
  });

  it('renders fellow dashboard page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      ...initialState
    });
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Router>
            <FellowDashboard
              user={{ name: 'test', email: 'roni@gmail.com' }}
              role="Fellow"
            />
          </Router>
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });
});
