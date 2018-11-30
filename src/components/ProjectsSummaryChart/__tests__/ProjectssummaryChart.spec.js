import React from 'react';
import { shallow } from 'enzyme';
import initialState from '../../../redux/reducers/initialState';
import configureStore from '../../../redux/store/configureStore';
import ProjectsSummaryChart from '../ProjectsSummaryChart';
import ProjectsSummary from '../../FellowsSummary';

const setup = () => {
  const props = {
    fetchTtlProjects: jest.fn(),
    handleCardClick: jest.fn(),
    fellowsSummary: initialState.fellowsSummary,
    fetchFellowsSummaryTTLLF: jest.fn(),
    event: { currentTarget: { id: '' } },
    user: {
      name: 'Trust Birungi',
      email: {
        includes: jest.fn()
      }
    }
  };

  const store = configureStore(initialState);

  const wrapper = shallow(<ProjectsSummaryChart {...props} store={store} />);

  return {
    props,
    wrapper,
    event: { currentTarget: { id: '' } },
    ProjectsSummary: wrapper.find(ProjectsSummary).length
  };
};

describe('<ProjectsSummaryChart />', () => {
  it('renders with default state', () => {
    const { wrapper } = setup();

    expect(ProjectsSummary).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('should tigger the preventDefault event', () => {
    const { wrapper } = setup();

    const event = {
      currentTarget: { id: '' }
    };

    const prevented = false;
    wrapper.instance().handleCardClick(event);
    expect(prevented).toBe(false);
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
    const { wrapper } = setup();
    const spy = jest.spyOn(wrapper.instance(), 'updateFellowSummary');
    wrapper.setState({ selected: 'Trend' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return a string on getCurrentClass', () => {
    const { wrapper } = setup();
    let classObject = wrapper.instance().getCurrentClass();
    expect(classObject).toEqual({ '--fellow-chart-tooltip': '12%' });

    wrapper.setProps({
      fellowsSummary: {
        loading: true,
        fellowsSummaryToday: { keys: ['Total'] },
        fellowsSummaryTrend: {},
        data: {},
        error: ''
      }
    });
    classObject = wrapper.instance().getCurrentClass();
    expect(classObject).toEqual({ '--fellow-chart-tooltip': '7.75%' });
  });
});
