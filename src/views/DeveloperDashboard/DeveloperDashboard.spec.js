import React from 'react';
import { shallow } from 'enzyme';
import DeveloperDashboard from './DeveloperDashboard';
import FellowSummaryData from '../../__mocks__/fellowSummary.json';
import EngineeringManagerFellowsSummaryData from '../../__mocks__/engineeringManagerTtls.json';
import SimulationLeadData from '../../__mocks__/simulationsLeadLf.json';

const setup = loggedInRole => {
  let managerDataForTest;
  switch (loggedInRole) {
    case 'WATCH_TOWER_EM':
      managerDataForTest = EngineeringManagerFellowsSummaryData;
      break;
    case 'WATCH_TOWER_SL':
      managerDataForTest = SimulationLeadData;
      break;
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
      managerDataForTest = FellowSummaryData;
      break;
    default:
  }

  const props = {
    user: {
      roles: {
        [`${loggedInRole}`]: '34323234Yf-34'
      },
      email: 'ty@andela.com'
    },
    getManagerFellowsSummary: jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        managerFellowsSummary: managerDataForTest
      })
    )
  };
  const developerDashboardWrapper = shallow(<DeveloperDashboard {...props} />);

  return { developerDashboardWrapper, props };
};
describe('Developers dashboard test', () => {
  it('should render developers dashboard without crashing', () => {
    const { developerDashboardWrapper } = setup('WATCH_TOWER_TTL');
    expect(developerDashboardWrapper).toMatchSnapshot();
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
});
