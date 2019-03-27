import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { TTLDashboardMain } from '../TTLDasboard';
import TTLDasboard from '..';

describe('<TLLDasboard  /> tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <TTLDasboard
          user={{ name: 'test', picture: 'http://' }}
          role="WATCH_TOWER_OPS"
        />
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(TTLDasboard)
        .dive()
        .name()
    ).toBe('Route');
  });

  it('renders without crashing', () => {
    const props = {
      getTtlProjects: jest.fn(),
      ttlProjects: {
        projects: {}
      },
      user: {
        email: 'test@mail.com'
      }
    };
    wrapper = shallow(<TTLDashboardMain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TLLDasboard  /> developers tab route tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/developers']}>
        <TTLDasboard
          user={{ name: 'test', picture: 'http://' }}
          role="WATCH_TOWER_OPS"
        />
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(TTLDasboard)
        .dive()
        .name()
    ).toBe('Route');
  });

  it('renders without crashing', () => {
    const props = {
      getTtlProjects: jest.fn(),
      ttlProjects: {
        projects: {}
      },
      user: {
        email: 'test@mail.com'
      }
    };
    wrapper = shallow(<TTLDashboardMain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
