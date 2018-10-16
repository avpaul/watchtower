import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import DashboardPage from '../../views/DashboardPage';
import PrivateRoute from './PrivateRoute';


test('it matches snapshot', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={[
      { pathname: '/dashboard', key: 'testkey' },
    ]}
    >
      <PrivateRoute component={DashboardPage} />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});
