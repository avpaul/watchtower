import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { RouteList } from '../index';
import LoginPage from '../../views/LoginPage/LoginPage';
import NotFoundPage from '../../views/NotFoundPage';

describe('<Routes />', () => {
  it('should render Routes', () => {
    const mockStore = configureStore();
    const store = mockStore({ test: 'test' });
    const tree = shallow(
      <MemoryRouter keyLength={0} initialEntries={['/test']}>
        <RouteList store={store} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
    expect(
      tree
        .dive()
        .dive()
        .name()
    ).toBe('Fragment');
  });

  it('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <RouteList />
      </MemoryRouter>
    );
    expect(typeof wrapper.find(LoginPage)).toEqual('object');
    expect(typeof wrapper.find(NotFoundPage));
  });
});
