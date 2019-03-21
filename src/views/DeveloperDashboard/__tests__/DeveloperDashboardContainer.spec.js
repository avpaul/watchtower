import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import initialState from '../../../redux/reducers/initialState';
import FellowSummaryData from '../../../__mocks__/fellowSummary.json';
import EngineeringManagerFellowsSummaryData from '../../../__mocks__/engineeringManagerTtls.json';
import SimulationLeadData from '../../../__mocks__/simulationsLeadLf.json';

import DeveloperDashboard, {
  mapStateToProps
} from '../DeveloperDashboardContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

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
describe('Tests on DevelopersDashboardContainer component', () => {
  let wrapper;

  const props = {
    history: {
      push: jest.fn()
    },
    user: {
      roles: {
        WATCH_TOWER_LF: '34323234Yf-34'
      },
      email: 'ty@andela.com'
    },
    role: 'WATCH_TOWER_LF',
    getManagerFellowsSummary: jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        managerFellowsSummary: getManagerDataByRole('WATCH_TOWER_LF')
      })
    )
  };

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(<DeveloperDashboard store={store} {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().data).toEqual([]);
    expect(wrapper.props().error).toEqual(null);
  });
});
