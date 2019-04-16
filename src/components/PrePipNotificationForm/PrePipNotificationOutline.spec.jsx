import React from 'react';
import { shallow } from 'enzyme';
import PrePipNotificationOutline from './PrePipNotificationOutline';

describe('Pre pip notification form', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      fellowFeedback: {
        Attribute: null,
        Context: 'Hi Sinmiloluwa',
        Criteria: 'lms',
        FirstName: 'Sinmiloluwa',
        LastName: 'Oloyede',
        Manager: {
          firstName: 'Trust ',
          lastName: 'Birungi',
          email: 'trust.birungi@andela.com'
        },
        Recommendation: null,
        index: '0'
      },
      serialNumber: 0
    };

    wrapper = shallow(<PrePipNotificationOutline {...props} />);
  });

  it('renders to match shapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
