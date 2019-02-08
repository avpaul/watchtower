import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EngineeringManagerSimsLeadDashboard from '../index';
import engineeringManagerTtls from '../../../__mocks__/engineeringManagerTtls';
import simulationsLeadLf from '../../../__mocks__/simulationsLeadLf';
import EngineeringManagerDashboard from '../EngineeringManagerDashboard';
import ManagerFellowSortInput from '../../../components/ManagerFellowMap/ManagerFellowSortInput';
import ManagerFellowMap from '../../../components/ManagerFellowMap';
import DisplayCard from '../../../components/Filters/DisplayCard';

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
          simulationsLead: {
            lfs: simulationsLeadLf.simulationsLead.lfs
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
        simulationsLead: {
          lfs: simulationsLeadLf.simulationsLead.lfs,
          show: true
        },
        totalFellows: 5
      },
      fellowsSummaryEM: {},
      fellowsSummaryTTL: {},
      fetchFellowsSummaryEm: spyResolve,
      fetchFellowsSummaryTTLLFAction: spyResolve,
      getEngineeringManagerTtls: spyResolve,
      getSimulationsLeadLfs: spyResolve
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

  it('handles card click', () => {
    const { wrapper } = setup();
    wrapper.setState({ chartFilter: 'TTL' });
    const totalFellowsCard = wrapper.find(DisplayCard);

    totalFellowsCard.simulate('click');
    expect(wrapper.state().chartFilter).toBe('TTL');
  });

  it('closes the map when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const handleMapCloseSpy = jest.spyOn(wrapper.instance(), 'handleMapClose');

    wrapper.instance().handleMapClose();
    expect(handleMapCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().show).toBe(false);
  });

  it('sets chartfilter state to Total when the handle Card  Click is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const event = {
      currentTarget: { id: 'total-fellows-card' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().chartFilter).toBe('Total');
  });

  it('closes the map when the handle Card  Click is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const event = {
      currentTarget: { id: 'trustburundi' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().chartFilter).toBe('TTL');
  });

  it('closes the chart when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ showChart: true });
    const handleChartCloseSpy = jest.spyOn(
      wrapper.instance(),
      'handleChartClose'
    );

    wrapper.instance().handleChartClose();
    expect(handleChartCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().showChart).toBe(false);
  });

  it('should fetch ttls data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [] });
    wrapper.instance().componentDidMount();
    expect(props.getEngineeringManagerTtls).toHaveBeenCalled();
  });

  it('should fetch ems fellows summary data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [] });
    wrapper.instance().componentDidMount();
    expect(props.fetchFellowsSummaryEm).toHaveBeenCalled();
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

  it('renders SimsLead dashboard when user role is WATCH_TOWER_SL ', () => {
    const { wrapper, props } = setup('WATCH_TOWER_SL');
    wrapper.instance().componentDidMount();
    expect(props.getSimulationsLeadLfs).toHaveBeenCalled();
  });
});
