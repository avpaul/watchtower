import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import DeveloperDashboard from '../DeveloperDashboard';
import FellowSummaryData from '../../../__mocks__/fellowSummary.json';
import EngineeringManagerFellowsSummaryData from '../../../__mocks__/engineeringManagerTtls.json';
import SimulationLeadData from '../../../__mocks__/simulationsLeadLf.json';
import FilterButton from '../../../components/Buttons/Button';
import FellowFilterCard from '../../../components/FellowFilterCard';
import MapFellowsFilterCard from '../../../components/MapFellowsFilterCard';

const getManagerDataByRole = loggedInRole => {
  switch (loggedInRole) {
    case 'WATCH_TOWER_EM':
      return { engineeringManager: EngineeringManagerFellowsSummaryData };
    case 'WATCH_TOWER_SL':
      return { simulationsLead: SimulationLeadData };
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
      return { data: FellowSummaryData };
    default:
      return null;
  }
};

/**
 ** Creates an enzyme instance to test the component.
 * @function
 * @param loggedInRole The role of the logged in user
 * @param urlPath The test url used to render the components accordingly.
 * @return { developerDashboardWrapper, props }
 */
const setup = (loggedInRole, urlPath = '/dashboard/fellows') => {
  const managerDataForTest = getManagerDataByRole(loggedInRole);

  const props = {
    history: { push: jest.fn() },
    user: {
      roles: { [`${loggedInRole}`]: '34323234Yf-34' },
      email: 'ty@andela.com'
    },
    role: loggedInRole,
    getManagerFellowsSummary: jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        managerFellowsSummary: managerDataForTest
      })
    )
  };

  const developerDashboardWrapper = shallow(<DeveloperDashboard {...props} />);

  const developerDashboardMountWrapper = shallow(
    <MemoryRouter initialEntries={[urlPath]}>
      {developerDashboardWrapper
        .find('Route[path="/dashboard/fellows"]')
        .prop('render')()}
    </MemoryRouter>
  );
  developerDashboardWrapper.setState({ fellowSummaryDetails: [] });
  return { developerDashboardWrapper, props, developerDashboardMountWrapper };
};

describe('Developers dashboard test', () => {
  /**
   ** Tests the Developer Dashboard according to the provided user role.
   * @param role The user role
   */
  const testComponentUsingRole = role => {
    const { developerDashboardWrapper } = setup(role);
    expect(developerDashboardWrapper).toMatchSnapshot();
  };

  it('should render developers dashboard as WATCH_TOWER_TTL without crashing', () => {
    testComponentUsingRole('WATCH_TOWER_TTL');
  });
  it('should render developers dashboard without crashing', () => {
    const { developerDashboardWrapper } = setup('WATCH_TOWER_LF');
    expect(developerDashboardWrapper).toMatchSnapshot();
    developerDashboardWrapper.setState({
      lfTtlSummary: [{ id: 1, name: '' }],
      isTicked: { status: 'status' },
      resetFellows: [{ id: 1, status: 'status' }],
      allFellows: []
    });
    developerDashboardWrapper.instance().filterFellows('main');
    developerDashboardWrapper.instance().filterFellows(1);
    developerDashboardWrapper.instance().renderResultCount();
    developerDashboardWrapper.instance().mapLfTtlData();
    developerDashboardWrapper.instance().renderFellowsDashboard([], 1);
  });

  it('should call filterFellows when the status filter represents all fellows', () => {
    const { developerDashboardWrapper } = setup('WATCH_TOWER_LF');
    developerDashboardWrapper.setState({
      isTicked: { status: 'All Fellows' },
      resetFellows: []
    });
    developerDashboardWrapper.instance().filterFellows(1);
  });

  it('should render developers dashboard without crashing', () => {
    const { developerDashboardWrapper } = setup('WATCH_TOWER_SL');
    expect(developerDashboardWrapper).toMatchSnapshot();
  });

  it('should call the getManagerFellowsAction when developers dashboard mounts', () => {
    const { developerDashboardWrapper, props } = setup('WATCH_TOWER_EM');
    const { getManagerFellowsSummary } = props;
    developerDashboardWrapper.instance().componentDidMount();
    expect(getManagerFellowsSummary).toHaveBeenCalled();
  });

  it('should redirect user to developer page when developer card is clicked', () => {
    const { props } = setup('WATCH_TOWER_LF');
    const wrapper = shallow(<DeveloperDashboard {...props} />);
    const instance = wrapper.instance();
    const fellowSummaryDetails = [
      {
        user: {
          email: 'brian.mboya@andela.com'
        }
      }
    ];
    instance.setState({ fellowSummaryDetails });
    const event = {
      currentTarget: {
        id: 0
      }
    };
    const email = {
      substr: jest.fn(() => 'brian.mboya'),
      search: jest.fn(() => '@andela.com')
    };

    instance.handleCardClick(event);
    instance.redirectUrl(email, props.history);
    expect(email.substr).toHaveBeenCalled();
    expect(email.search).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should clear state to default when clear filters button is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'On Track', project: 'All Product' },
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(FilterButton)
      .dive()
      .simulate('click');
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      managers: 'All Managers',
      project: 'All Products',
      status: 'All Fellows'
    });
  });

  it('should set status to all fellows  when a all-fellows card is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'On Track', project: 'All Products' },
      allFellows: FellowSummaryData,
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(MapFellowsFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'All Fellows',
          attributes: [{}, {}, { value: 'status' }]
        }
      });
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      project: 'All Products',
      status: 'All Fellows'
    });
    expect(
      developerDashboardWrapper.state('fellowSummaryDetails').length
    ).toEqual(6);
  });

  it('should status to ontrack when a on-track card is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'On Track', project: 'All Products' },
      allFellows: FellowSummaryData,
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(MapFellowsFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'Watch Tower',
          attributes: [{}, {}, { value: 'project' }]
        }
      });
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      project: 'Watch Tower',
      status: 'On Track'
    });
    expect(
      developerDashboardWrapper.state('fellowSummaryDetails').length
    ).toEqual(2);
  });

  it('should status to ontrack when a on-track card is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'All Fellows', project: 'All Products' },
      allFellows: FellowSummaryData,
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(MapFellowsFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'On Track',
          attributes: [{}, {}, { value: 'status' }]
        }
      });
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      project: 'All Products',
      status: 'On Track'
    });
    expect(
      developerDashboardWrapper.state('fellowSummaryDetails').length
    ).toEqual(2);
  });

  it('should set status to Off Track when Off Track card is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'All Fellows', project: 'All Products' },
      allFellows: FellowSummaryData,
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(MapFellowsFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'Off Track',
          attributes: [{}, {}, { value: 'status' }]
        }
      });
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      project: 'All Products',
      status: 'Off Track'
    });
    expect(
      developerDashboardWrapper.state('fellowSummaryDetails').length
    ).toEqual(1);
  });

  it('should set status to PIP when pip card is clicked', () => {
    const { developerDashboardWrapper, developerDashboardMountWrapper } = setup(
      'WATCH_TOWER_TTL'
    );
    developerDashboardWrapper.setState({
      isTicked: { status: 'All Fellows', project: 'All Products' },
      allFellows: FellowSummaryData,
      fellowSummaryDetails: []
    });
    developerDashboardMountWrapper
      .find(MapFellowsFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'PIP',
          attributes: [{}, {}, { value: 'status' }]
        }
      });
    expect(developerDashboardWrapper.state('isTicked')).toEqual({
      project: 'All Products',
      status: 'PIP'
    });
    expect(
      developerDashboardWrapper.state('fellowSummaryDetails').length
    ).toEqual(3);
  });
});

export default getManagerDataByRole;
