import React from 'react';
import { shallow } from 'enzyme';

import DeveloperDashboard from './DeveloperDashboard';

import FellowSummaryData from '../../__mocks__/fellowSummary.json';
import EngineeringManagerFellowsSummaryData from '../../__mocks__/engineeringManagerTtls.json';
import SimulationLeadData from '../../__mocks__/simulationsLeadLf.json';

export function getManagerDataByRole(loggedInRole) {
  switch (loggedInRole) {
    case 'WATCH_TOWER_EM':
      return EngineeringManagerFellowsSummaryData;
    case 'WATCH_TOWER_SL':
      return SimulationLeadData;
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
      return FellowSummaryData;
    default:
      return null;
  }
}

const setup = loggedInRole => {
  /**
   * Creates an enzyme instance to test the component.
   * @function
   *
   * @returns { developerDashboardWrapper, props }
   */
  const managerDataForTest = getManagerDataByRole(loggedInRole);

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
  const testComponentUsingRole = role => {
    const { developerDashboardWrapper } = setup(role);
    expect(developerDashboardWrapper).toMatchSnapshot();
  };

  it('should render developers dashboard as WATCH_TOWER_TTL without crashing', () => {
    testComponentUsingRole('WATCH_TOWER_TTL');
  });

  it('should render developers dashboard as WATCH_TOWER_SL without crashing', () => {
    testComponentUsingRole('WATCH_TOWER_SL');
  });

  it('should call the getManagerFellowsAction when developers dashboard mounts', () => {
    const { developerDashboardWrapper, props } = setup('WATCH_TOWER_EM');
    const { getManagerFellowsSummary } = props;
    developerDashboardWrapper.instance().componentDidMount();
    expect(getManagerFellowsSummary).toHaveBeenCalled();
  });
});

export default {
  getManagerDataByRole
};
