import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import initialState from '../../../redux/reducers/initialState';
import configureStore from '../../../redux/store/configureStore';
import ProjectsSummaryChart from '../ProjectsSummaryChart';
import ProjectsSummary from '../../FellowsSummary';
import FellowsMock from '../../../__mocks__/fellows.json';

const props = {
  fetchManagerProfile: jest.fn(),
  manager: {
    loading: false,
    data: {
      fellows: FellowsMock,
      projects: [
        {
          count: 3,
          project: 'WatchTower'
        }
      ],
      performance: {
        today: {
          latestWeekSummary: {
            Total: 3,
            WatchTower: 3
          }
        },
        trend: {
          latestWeekSummary: {
            Total: 3,
            WatchTower: 3
          }
        }
      }
    }
  },
  user: {
    name: 'Trust Birungi',
    email: {
      includes: jest.fn()
    }
  }
};

const store = configureStore({ ...initialState, manager: props.manager });

const setup = (mountComponent = false) => {
  let wrapper = {};

  if (mountComponent)
    wrapper = mount(
      <Provider store={store}>
        <ProjectsSummaryChart {...props} />
      </Provider>
    );
  else wrapper = shallow(<ProjectsSummaryChart {...props} />);

  return { props, wrapper };
};

describe('<ProjectsSummaryChart />', () => {
  it('renders with default state', () => {
    const { wrapper } = setup();

    expect(ProjectsSummary).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state on updateSelected', () => {
    const { wrapper } = setup();
    wrapper.instance().updateSelected('DOA');
    expect(wrapper.instance().state.selected).toBe('DOA');
  });

  it('should set state on handleChartClose', () => {
    const { wrapper } = setup();
    wrapper.instance().state.showChart = true;
    wrapper.instance().handleChartClose();
    expect(wrapper.instance().state.showChart).toBe(false);
  });

  it('should get data on change selected', () => {
    const { wrapper } = setup(true);
    wrapper
      .find('.card')
      .at(1)
      .simulate('click');
    expect(
      wrapper.find(ProjectsSummaryChart).state('fellowsSummaryFilter')
    ).toBe('Total');
  });
});
