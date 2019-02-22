import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../redux/reducers/initialState';
import DeveloperDashboard from './DeveloperDashboard';
import DeveloperDashboardContainer, {
  mapStateToProps
} from './DeveloperDashboardContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

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
});
