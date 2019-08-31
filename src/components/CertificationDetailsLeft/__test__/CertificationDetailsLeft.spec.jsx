import React from 'react';
import { shallow } from 'enzyme';
import CertificationDetailsLeft from '../CertificationDetailsLeft';

describe('Test the certification page', () => {
  const props = {
    certificationInfo: {
      exclusive: false,
      name: 'Certification Name'
    },
    vacancyInfo: {
      vacancy_details: {},
      available_slots: 10
    }
  };

  const setUp = (propsOverride = {}) =>
    shallow(<CertificationDetailsLeft {...props} {...propsOverride} />);

  let propsOverride;

  it('should render without errors', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('should render without errors when vacancy details are not provided', () => {
    propsOverride = props;
    delete propsOverride.vacancyInfo.vacancy_details;
    const component = setUp(propsOverride);
    expect(component).toMatchSnapshot();
  });

  it('should render type as exclusive when exclusive is true', () => {
    propsOverride = {
      certificationInfo: {
        exclusive: true
      }
    };
    const component = setUp(propsOverride);
    expect(component.find('#projectType').text()).toEqual('EXCLUSIVE');
  });

  it('should render without errors when vacancy slot is one', () => {
    propsOverride = {
      vacancyInfo: {
        available_slots: 1
      }
    };
    const component = setUp(propsOverride);
    expect(component.find('#availableSlots').text()).toEqual('1');
  });
});
