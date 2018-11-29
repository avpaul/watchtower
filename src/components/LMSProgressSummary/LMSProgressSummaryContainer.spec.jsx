import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../redux/reducers/initialState';
import LMSProgressSummary from './LMSProgressSummary';
import LMSProgressSummaryContainer, {
  mapStateToProps
} from './LMSProgressSummaryContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

describe('LMSProgressSummaryContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(<LMSProgressSummaryContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('renders LMSProgressSummary component', () => {
    expect(LMSProgressSummary).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().fellowLmsRatings).toEqual({
      loading: false,
      data: {},
      error: null
    });
  });
});
