import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { getMenuItems } from './navlinks';
import Menu from './Menu';
import MenuLink from '.';

const links = [
  {
    key: 'fellows',
    name: 'Fellows',
    path: '#',
    icon: <div className="default-icon" />,
    activeIcon: <div className="active-icon" />,
    dropdown: ['All Developers', 'Developers under PIP']
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '#',
    icon: <div className="default-icon" />,
    activeIcon: <div className="active-icon" />,
    dropdown: []
  }
];

const props = {
  items: links,
  handleMenuClick: jest.fn(),
  activeItems: { fellows: false, dashboard: true, settings: true },
  role: 'WATCH_TOWER_LF'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Menu {...props} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders MenuLink child components', () => {
  const wrapper = shallow(<Menu {...props} />);
  expect(wrapper.find(MenuLink)).toBeDefined();
});

describe('Menu Component Test Suite', () => {
  it('renders witout error', () => {
    const items = getMenuItems('Fellow');
    const activeItems = [
      {
        key: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard'
      }
    ];

    const snap = shallow(
      <Menu items={items} role="Fellow" activeItems={activeItems} />
    );
    expect(snap).toMatchSnapshot();
  });
});
