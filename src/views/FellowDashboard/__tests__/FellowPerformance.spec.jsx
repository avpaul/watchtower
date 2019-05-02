import React from 'react';
import { shallow } from 'enzyme';
import { FellowPerformance, PaginationWrapped } from '../FellowPerformance';
import FellowFeedback from '../../../components/FellowFeedback/FeedbackInstancesCards';
import mockPaginationWrapper from '../../../components/Pagination/mockPaginationWrapper';
import FellowFilterCard from '../../../components/FellowFilterCard';

const props = {
  getFellowPipFeedback: jest.fn(),
  getFellowPrePipFeedback: jest.fn(),
  fellowPrePipFeedback: { total: 23, data: [] },
  feedback: { payload: [], total: 10 }
};

const object = {
  getFellowPipFeedback: jest.fn(),
  getFellowPrePipFeedback: jest.fn(),
  fellowPrePipFeedback: { total: 23, data: [] },
  feedback: { payload: [], total: 10 },
  paginationWrapper: {
    state: {
      paginatedData: {}
    },
    renderPagination: () => {},
    updateData: () => {}
  },
  data: []
};

/**
 * @description Creates an enzyme instance to test the Feedback Dashboard Page component.
 * @param mountComponent Renders a mounted enzyme wrapper if set to true
 * @param propOverrides Used to edit the props passed to the component when being mounted
 *
 * @returns { object } { props, feedbackDashboardWrapper }
 */
const setup = (mountComponent = false, propsOverrides = {}) => {
  const newProps = { ...props, ...propsOverrides };

  const fellowPerformanceWrapper = mountComponent
    ? shallow(
        <PaginationWrapped component={<FellowPerformance {...props} />} />
      )
    : shallow(
        <FellowPerformance
          {...newProps}
          paginationWrapper={mockPaginationWrapper}
        />
      );

  return { fellowPerformanceWrapper, props: newProps };
};
describe('Tests FellowPerformance component component', () => {
  it('renders correctly', () => {
    const { fellowPerformanceWrapper } = setup(false, {});
    fellowPerformanceWrapper.setState({
      isTicked: { type: 'Pre-PIP' }
    });

    expect(fellowPerformanceWrapper.state('isTicked')).toEqual({
      type: 'Pre-PIP'
    });
    fellowPerformanceWrapper.setProps({
      feedback: undefined
    });
    expect(
      fellowPerformanceWrapper.find(FellowFeedback).prop('noOfPipInstances')
    ).toEqual(0);
  });

  it('shallow renders the paginated fellow performance component correctly', () => {
    const { fellowPerformanceWrapper } = setup(true, {});
    expect(fellowPerformanceWrapper).toMatchSnapshot();
  });

  it('displays the PRE PIP FEEDBACK instances when the apporpriate card is clicked', () => {
    const { fellowPerformanceWrapper } = setup(false, {});
    fellowPerformanceWrapper.setState({
      isTicked: { type: 'Pre-PIP' }
    });
    fellowPerformanceWrapper
      .find(FellowFeedback)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        target: {
          id: 'Pre-PIP'
        }
      });

    expect(fellowPerformanceWrapper.state('isTicked')).toEqual({
      type: 'Pre-PIP'
    });
  });

  it('displays the PIP FEEDBACK instances when the apporpriate card is clicked', () => {
    const { fellowPerformanceWrapper } = setup(false, {});
    fellowPerformanceWrapper.setState({
      isTicked: { type: 'PIP' }
    });
    fellowPerformanceWrapper
      .find(FellowFeedback)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        target: {
          id: 'PIP'
        }
      });

    expect(fellowPerformanceWrapper.state('isTicked')).toEqual({
      type: 'PIP'
    });
  });

  it('should test the handleClick method', () => {
    const wrapper = shallow(<FellowPerformance {...object} />);
    expect(wrapper.instance().handleClick(2)).toBe(undefined);
    const fellowPerformance = new FellowPerformance();
    expect(typeof fellowPerformance.handleClick).toEqual('function');
    expect(wrapper.instance().updateInitialState([])).toBe(undefined);
    expect(typeof fellowPerformance.state).toEqual('object');
    expect(fellowPerformance.state).toEqual({
      isTicked: { type: 'Pre-PIP' },
      feedbackInstance: null
    });
  });

  it('should test component did update', () => {
    const { fellowPerformanceWrapper } = setup(false, {});
    const spyFunc = jest.spyOn(
      fellowPerformanceWrapper.instance(),
      'updateInitialState'
    );
    fellowPerformanceWrapper.setProps({
      fellowPrePipFeedback: { data: [{}] }
    });
    expect(spyFunc).toHaveBeenCalled();
  });
});
