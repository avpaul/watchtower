import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import FellowHistoryContainer from '../../components/FellowHistory';
import MapFellowsSummaryCard from '../../components/MapFellowsSummaryCard';

import initialState from '../../redux/reducers/initialState';
import DeveloperDashboard from './DeveloperDashboard';
import DeveloperDashboardContainer, {
  mapStateToProps
} from './DeveloperDashboardContainer';

import { getManagerDataByRole } from './DeveloperDashboard.spec';

const initState = initialState;
const mockStore = configureStore();
let store;

const setup = (loggedInRole, urlPath) => {
  /**
   * Creates an enzyme instance to test the component. The component is rendered
   * according to the url path that is being pre-defined
   * @function
   *
   * @returns { mountedWrapper, props}
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

  const mountedWrapper = mount(
    <MemoryRouter initialEntries={[urlPath]}>
      <DeveloperDashboard {...props} />
    </MemoryRouter>
  );

  return { mountedWrapper, props };
};

describe('Tests on DevelopersDashboardContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(<DeveloperDashboardContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('renders DeveloperDashboard component', () => {
    expect(DeveloperDashboard).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().data).toEqual([]);
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().error).toEqual(null);
  });

  const testRoute = (path, container) => {
    /**
     * Tests if the routes are rendering the expected components
     * @function
     */
    const { mountedWrapper } = setup('WATCH_TOWER_TTL', path);
    expect(mountedWrapper.find(container).exists()).toBe(true);
  };

  it('should render the fellow history container', () => {
    testRoute('/dashboard/fellow/John.Doe', FellowHistoryContainer);
  });

  it('should render the fellows container', () => {
    testRoute('/dashboard/fellows', MapFellowsSummaryCard);
  });
});
