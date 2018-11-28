import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FellowDashboardPage from '..';

describe('FellowDashboardPage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Router>
          <FellowDashboardPage
            user={{ name: 'test', picture: 'http://', email: 'roni@mail.com' }}
            role="Fellow"
          />
        </Router>
      </MemoryRouter>
    );
  });

  it('matches correctly', () => {
    expect(
      wrapper
        .find(FellowDashboardPage)
        .dive()
        .name()
    ).toBe('Route');
  });

  it('renders fellow dashboard page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ fellow: { fellow: {} } });
    const wrap = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Router>
          <FellowDashboardPage
            user={{ name: 'test', email: 'roni@gmail.com' }}
            role="Fellow"
            store={store}
          />
        </Router>
      </MemoryRouter>
    );
    expect(wrap.length).toEqual(1);
  });
});
