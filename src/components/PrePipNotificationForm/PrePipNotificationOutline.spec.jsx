import React from 'react';
import { shallow } from 'enzyme';
import PrePipNotificationOutline, {
  managerName
} from './PrePipNotificationOutline';

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

  it('renders to match shapshot with manager name from stringified object', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Manager name to be retrieved from JSON object', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      fellowFeedback: {
        Attribute: null,
        Context: 'Hi Sinmiloluwa',
        Criteria: 'lms',
        name: 'Sinmiloluwa Oloyede',
        Manager: {
          staff_id: '-LU5ayJwwvcPATT1akh5',
          name: 'Olaolu Akinsete',
          email: 'olaolu.akinsete@andela.com',
          role: 'TTL',
          manager_id: '-KXGy1MT1oimjQgFim8t'
        },
        Recommendation: null,
        index: '0'
      },
      serialNumber: 0,
      Instances: ['2018-10-29 14:34:03', '2018-10-30 14:34:03'],
      startDate: '2018-10-29 14:34:03'
    };

    wrapper = shallow(<PrePipNotificationOutline {...props} />);
  });

  it('renders to match shapshot with manager name from json object', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Manager name will be null', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      fellowFeedback: {
        Attribute: null,
        Context: 'Hi Sinmiloluwa',
        Criteria: 'lms',
        name: 'Sinmiloluwa Oloyede',
        Manager: 'null',
        Recommendation: null,
        index: '0'
      },
      serialNumber: 0,
      Instances: ['2018-10-29 14:34:03', '2018-10-30 14:34:03'],
      startDate: '2018-10-29 14:34:03'
    };

    wrapper = shallow(<PrePipNotificationOutline {...props} />);
  });

  it('renders to match shapshot with no manager name', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('should test the managersName method', () => {
  const data1 = {
    Manager: {
      staff_id: '-LU5ayJwwvcPATT1akh5',
      name: 'Olaolu Akinsete',
      email: 'olaolu.akinsete@andela.com',
      role: 'TTL',
      manager_id: '-KXGy1MT1oimjQgFim8t'
    }
  };

  const data2 = {
    Manager: 'null'
  };

  const data3 = {
    Manager:
      '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}'
  };

  it('should return a null value', () => {
    const result = managerName(data2);

    expect(result).toEqual(null);
  });

  it("should return a manager's name", () => {
    const result = managerName(data1);

    expect(result).toEqual('Olaolu Akinsete, Manager');
  });

  it("should return a manager's name", () => {
    const result = managerName(data3);

    expect(result).toEqual('Olaolu Akinsete, Manager');
  });
});
