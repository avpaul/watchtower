import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EngineeringManagerSimsLeadDashboard from '../index';
import engineeringManagerTtls from '../../../__mocks__/engineeringManagerTtls';
import EngineeringManagerDashboard from '../EngineeringManagerDashboard';
import ManagerFellowSortInput from '../../../components/ManagerFellowMap/ManagerFellowSortInput';
import ManagerFellowMap from '../../../components/ManagerFellowMap';

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
  const setup = (loggedInRole = 'WATCH_TOWER_EM') => {
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
          [`${loggedInRole}`]: 'hdkjshdjsdha'
        }
      },
      data: {
        engineeringManager: {
          ttls: engineeringManagerTtls.engineeringManager.ttls,
          show: true,
          managerTitle: 'TTL',
          managerFellowSortRatio: 'HIGH_TO_LOW'
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

  it('changes manager to fellow ratio when select changed', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const managerFellowSortInput = wrapper
      .find(ManagerFellowMap)
      .dive()
      .find(ManagerFellowSortInput);

    managerFellowSortInput.simulate(
      'change',
      'lfFellowRatio',
      'Fellow Ratio, Low to High'
    );
    expect(wrapper.state().managerFellowSortRatio).toBe('LOW_TO_HIGH');
  });

  it('closes the map when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const handleMapCloseSpy = jest.spyOn(wrapper.instance(), 'handleMapClose');

    wrapper.instance().handleMapClose();
    expect(handleMapCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().show).toBe(false);
  });

  it('should fetch ttls data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [] });
    wrapper.instance().componentDidMount();
    expect(props.getEngineeringManagerTtls).toHaveBeenCalled();
  });

  it('sets show to true when fellowMapOnClick is called ', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: false });
    const fellowMapOnClickSpy = jest.spyOn(
      wrapper.instance(),
      'fellowMapOnClick'
    );

    wrapper.instance().fellowMapOnClick();
    expect(fellowMapOnClickSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().show).toBe(true);
  });
});
