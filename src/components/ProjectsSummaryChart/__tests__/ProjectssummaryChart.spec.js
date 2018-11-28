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
    event: jest.fn(),
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
      preventDefault: jest.fn()
    };

    const prevented = false;
    wrapper.instance().handleCardClick(event);
    expect(prevented).toBe(false);
  });
});
