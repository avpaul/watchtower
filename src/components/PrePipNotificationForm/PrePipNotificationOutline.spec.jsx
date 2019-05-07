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
        name: 'Sinmiloluwa Oloyede',
        Manager:
          '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}',
        Recommendation: null,
        index: '0'
      },
      serialNumber: 0,
      Instances: ['2018-10-29 14:34:03', '2018-10-30 14:34:03'],
      startDate: '2018-10-29 14:34:03'
    };

    wrapper = shallow(<PrePipNotificationOutline {...props} />);
  });

  it('renders to match shapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
