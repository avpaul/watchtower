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
    const props = {
      lmsSummary: {},
      lmsSubmissions: [
        {
          id: 1122,
          due_date: new Date(),
          name: 'Output 1.1 Kick off call',
          score: '',
          workflow_state: 'submitted'
        },
        {
          id: 1322,
          due_date: new Date(),
          name: 'Output 1.2 Estimating risks',
          score: '2',
          workflow_state: 'graded'
        }
      ]
    };
    wrapper = shallow(<LMSProgressSummaryContainer store={store} {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toBeDefined();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('renders LMSProgressSummary component', () => {
    expect(LMSProgressSummary).toBeDefined();
  });
});
