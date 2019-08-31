import React from 'react';
import { shallow } from 'enzyme';
import CertificationDetailsRight from '../CertificationDetailsRight';

describe('Test the certification page', () => {
  const props = {
    certificationInfo: {
      id: 1,
      exclusive: false,
      name: 'Certification Name'
    },
    vacancyInfo: {
      vacancy_details: {
        cycle_id: 1
      },
      available_slots: 10
    },
    loading: false,
    applyForCertification: jest.fn(),
    userHasApplied: false
  };

  const setUp = (propsOverride = {}) =>
    shallow(<CertificationDetailsRight {...props} {...propsOverride} />);

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

  it('it should change the modal state when setstate is called ', () => {
    const component = setUp();
    component.setState({
      modals: {
        applicationModal: true
      }
    });
    expect(component.find('SellYourselfModal').length).toBe(1);
  });

  it('should render with apply button disabled if user has applied', () => {
    propsOverride = {
      userHasApplied: true
    };
    const component = setUp(propsOverride);
    expect(component.find('#buttonDisabled').length).toBe(1);
  });

  it('it should change state on button click ', () => {
    const component = setUp();
    const spy = jest.spyOn(
      component.instance(),
      'certificationApplicationHandler'
    );
    component.find('#applyButton').simulate('click');
    expect(spy).toBeCalled();
  });
});
