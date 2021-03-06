import React from 'react';
import { shallow } from 'enzyme';
import LmsTable from '../LmsTable';

describe('tests the LmsTable', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  let wrapper4;
  beforeEach(() => {
    const props = {
      lmsSubmissions: [],
      loading: true,
      fellow: {}
    };
    const props2 = {
      lmsSubmissions: [],
      loading: false,
      attempts: 1,
      fellow: {
        actualApprenticeshipStartDate: '2019-03-18',
        actualSimulationsCompletionDate: '2019-03-15',
        apprenticeshipManager: 'Trust Birungi',
        apprenticeshipTeam: 'Watch Tower',
        apprenticeshipTechnology:
          'JavaScript,  PHP/Laravel,  ReactJS,  Eloquent',
        bio:
          'Sed quo voluptatum ducimus sunt labore eos totam. Sit corporis est voluptates commodi occaecati. Modi harum assumenda quod voluptatem.',
        cohort: 'Class 13 - KLA',
        currentStage: 'Apprentice',
        email: 'stanton.rogahn@andela.com'
      }
    };

    const props3 = {
      lmsSubmissions: [{}],
      loading: true,
      fellow: {
        actualApprenticeshipStartDate: '2019-03-18',
        actualSimulationsCompletionDate: '2019-03-15',
        apprenticeshipManager: 'Trust Birungi',
        apprenticeshipTeam: 'Watch Tower',
        apprenticeshipTechnology:
          'JavaScript,  PHP/Laravel,  ReactJS,  Eloquent',
        bio:
          'Sed quo voluptatum ducimus sunt labore eos totam. Sit corporis est voluptates commodi occaecati. Modi harum assumenda quod voluptatem.',
        cohort: 'Class 13 - KLA',
        currentStage: 'Apprentice',
        email: 'stanton.rogahn@andela.com'
      }
    };

    const props4 = {
      lmsSubmissions: null,
      loading: true,
      fellow: {
        actualApprenticeshipStartDate: '2019-03-18',
        actualSimulationsCompletionDate: '2019-03-15',
        apprenticeshipManager: 'Trust Birungi',
        apprenticeshipTeam: 'Watch Tower',
        apprenticeshipTechnology:
          'JavaScript,  PHP/Laravel,  ReactJS,  Eloquent',
        bio:
          'Sed quo voluptatum ducimus sunt labore eos totam. Sit corporis est voluptates commodi occaecati. Modi harum assumenda quod voluptatem.',
        cohort: 'Class 13 - KLA',
        currentStage: 'Apprentice',
        email: 'stanton.rogahn@andela.com'
      }
    };

    wrapper = shallow(<LmsTable {...props} />);
    wrapper2 = shallow(<LmsTable {...props2} />);
    wrapper3 = shallow(<LmsTable {...props3} />);
    wrapper4 = shallow(<LmsTable {...props4} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper2).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper3).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper4).toMatchSnapshot();
  });
});
