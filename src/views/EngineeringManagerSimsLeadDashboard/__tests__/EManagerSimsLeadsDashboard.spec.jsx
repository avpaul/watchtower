import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EngineeringManagerSimsLeadDashboard from '../index';
import engineeringManagerSimsLeadData from '../../../__mocks__/engineeringManagerTtls.json';
import fellowTrends from '../../../__mocks__/fellowTends.json';

import EManagerSimsLeadsDashboard from '../EManagerSimsLeadsDashboard';
import ManagerFellowSortInput from '../../../components/ManagerFellowMap/ManagerFellowSortInput';
import ManagerFellowMap from '../../../components/ManagerFellowMap';

describe('EManagerSimsLeadsDashboard', () => {
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
  const spyResolve = jest.fn().mockImplementation(() => Promise.resolve({}));

  const defaultProps = {
    data: {
      managers: {
        data: engineeringManagerSimsLeadData.data,
        totalFellows: 5
      }
    },
    fellowsSummary: {
      summary: fellowTrends.summary
    },
    fetchFellowsSummaryEm: spyResolve,
    getEmsSimsLeadsActions: spyResolve
  };

  const setup = (loggedInRole = 'WATCH_TOWER_EM') => {
    const props = {
      ...defaultProps,
      user: {
        roles: {
          [`${loggedInRole}`]: 'hdkjshdjsdha'
        }
      },
      role: loggedInRole
    };

    const wrapper = shallow(<EManagerSimsLeadsDashboard {...props} />);

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
      'HIGH_TO_LOW',
      'Fellow Ratio, High to Low'
    );
    expect(wrapper.state().managerFellowSortRatio).toBe('HIGH_TO_LOW');
  });

  it('closes the map when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const handleMapCloseSpy = jest.spyOn(wrapper.instance(), 'handleMapClose');

    wrapper.instance().handleMapClose();
    expect(handleMapCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().show).toBe(false);
  });

  it('sets showChart state to true when the handleCardClick function is called', () => {
    const { wrapper } = setup('WATCH_TOWER_SL');
    wrapper.setState({ show: false });
    const event = {
      currentTarget: { id: 'total-fellows-card' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showChart).toBe(true);
  });

  it('sets showChart state to true when the handleCardClick function is called', () => {
    const { wrapper } = setup('WATCH_TOWER_EM');
    wrapper.setState({ show: false });
    const event = {
      currentTarget: { id: 'wt-test-ttl@andela.com' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showChart).toBe(true);
  });

  it('sets showChart state to true when the handleCardClick function is called', () => {
    const { wrapper } = setup('WATCH_TOWER_SL');
    wrapper.setState({ show: false });
    const event = {
      currentTarget: { id: 'wt-test-ttl@andela.com' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showChart).toBe(true);
  });

  it('sets showChart state to true when the handleCardClick function is called', () => {
    const { wrapper } = setup('WATCH_TOWER_EM');
    wrapper.setState({ show: false });
    const event = {
      currentTarget: { id: 'total-fellows-card' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showChart).toBe(true);
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

  it('should fetch managees data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ managees: [] });
    wrapper.instance().componentDidMount();
    expect(props.getEmsSimsLeadsActions).toHaveBeenCalled();
  });

  it('should fetch ems fellows summary data when data is not in store', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ managees: [] });
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
});
