import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EngineeringManagerSimsLeadDashboard from '../index';
import engineeringManagerTtls from '../../../__mocks__/engineeringManagerTtls';
import EngineeringManagerDashboard from '../EngineeringManagerDashboard';

describe('EngineeringManagerDashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <EngineeringManagerSimsLeadDashboard
          user={{ name: 'test', picture: 'http://' }}
          role="WATCH_TOWER_EM"
        />
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(EngineeringManagerSimsLeadDashboard)
        .dive()
        .name()
    ).toBe('Route');
  });
});

describe('EngineeringDashboard component', () => {
  const setup = () => {
    const spyResolve = jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: null,
        data: {
          engineeringManager: {
            ttls: engineeringManagerTtls.engineeringManager.ttls
          },
          totalFellows: 5,
          averageFellowsPerTtl: 5
        }
      })
    );

    const props = {
      user: {
        email: '',
        roles: {
          WATCH_TOWER_EM: 'hdkjshdjsdha'
        }
      },
      data: {
        engineeringManager: {
          ttls: engineeringManagerTtls.engineeringManager.ttls
        },
        totalFellows: 5
      },
      getEngineeringManagerTtls: spyResolve
    };

    const wrapper = shallow(<EngineeringManagerDashboard {...props} />);

    return {
      props,
      wrapper,
      spyResolve
    };
  };

  it('renders to match snapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch ttls data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [] });
    wrapper.instance().componentDidMount();
    expect(props.getEngineeringManagerTtls).toHaveBeenCalled();
  });
});
