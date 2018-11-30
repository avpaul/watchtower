import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Routes from './index';

describe('<Routes />', () => {
  it('should render Routes', () => {
    const mockStore = configureStore();
    const store = mockStore({ test: 'test' });
    const tree = shallow(
      <MemoryRouter keyLength={0} initialEntries={['/test']}>
        <Routes store={store} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
    expect(
      tree
        .dive()
        .dive()
        .name()
    ).toBe('');
  });
});
