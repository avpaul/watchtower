import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../redux/reducers/initialState';
import OpsDashboardMain from '.';
import OpsDashboardContainer, {
  mapStateToProps
} from './OpsDashboardContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

describe('OpsDashboardContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(<OpsDashboardContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('renders OpsDashboardMain component', () => {
    expect(OpsDashboardMain).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().ttls).toEqual([]);
    expect(wrapper.props().lfs).toEqual([]);
    expect(wrapper.props().averageFellowsPerTtl).toEqual(0);
    expect(wrapper.props().averageFellowsPerLf).toEqual(0);
  });
});
