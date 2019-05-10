import React from 'react';
import { shallow } from 'enzyme';
import FeedbackInstances from '../FeedbackInstances';

let props;

describe('Test Feedback Instances component', () => {
  it('should render Pre-pip feedback instances properly', () => {
    props = {
      PrePipEntries: [
        {
          type: 'pre-pip',
          id: 1,
          updated_at: '2018-10-29 14:34:03'
        },
        {
          type: 'pip',
          id: 2,
          updated_at: '2018-10-29 14:34:03'
        }
      ]
    };
    const wrapper = shallow(<FeedbackInstances {...props} />);
    expect(wrapper.find('FilterCard').length).toEqual(2);
  });
  it('should render Pip feedback instances properly', () => {
    props = {
      PrePipEntries: [
        {
          type: 'pip',
          id: 1,
          updated_at: '2018-10-29 14:34:03'
        },
        {
          type: 'pip',
          id: 2,
          updated_at: '2018-10-29 14:34:03'
        }
      ]
    };
    const wrapper = shallow(<FeedbackInstances {...props} />);
    expect(wrapper.find('h6').text()).toBe('PIP instances');
  });

  it('should trigger modal', () => {
    const container = shallow(<FeedbackInstances {...props} />);

    const overlay = container.find('#pip-feedback-modal');
    expect(typeof overlay).toEqual('object');
  });

  it('should render the apporpriate message when there are no feedback', () => {
    props = {
      PrePipEntries: undefined
    };
    const wrapper = shallow(<FeedbackInstances {...props} />);
    expect(wrapper.find('h3').text()).toBe(
      'Hey there. You have no feedback yet, Keep it up!'
    );
  });
});
