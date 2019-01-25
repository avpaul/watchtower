import { shallow } from 'enzyme';
import React from 'react';
import EngineeringManagerDashboard from '../EngineeringManagerDashboard';

describe('tests on EngineeringDashboard component', () => {
  const setup = () => {
    const spyResolve = jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        data: {
          averageFellowsPerTtl: 4
        }
      })
    );

    const props = {
      user: {
        email: '',
        roles: {
          WATCH_TOWER_EM: '3223'
        }
      },
      getEngineeringManagerTtls: spyResolve
    };

    const wrapper = shallow(<EngineeringManagerDashboard {...props} />);

    return {
      props,
      wrapper
    };
  };

  it('renders to match snapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch engineering managers data when component mounts', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [], lfs: [] });
    wrapper.instance().componentDidMount();
    expect(props.getEngineeringManagerTtls).toHaveBeenCalled();
    expect(wrapper.state('isEngineeringManager')).toBe(true);
  });
});
