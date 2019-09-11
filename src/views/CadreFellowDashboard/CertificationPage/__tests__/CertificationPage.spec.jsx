import React from 'react';
import { shallow } from 'enzyme';
import CertificationPage from '../CertificationPage';
import Loader from '../../../../components/Loader/Loader';

describe('Test the certification page', () => {
  const props = {
    getCertificationAction: jest.fn(),
    history: {
      push: jest.fn(),
      goBack: jest.fn()
    },
    match: {
      params: {
        certificationId: '1'
      }
    },
    applyForCertification: jest.fn(),
    d1Engineer: {
      fellow_id: '-PUEHGE8716LJH'
    },
    getCertification: {
      loading: false,
      data: {
        1: {
          id: 1,
          name: 'Testing',
          description: 'Test description',
          exclusive: true
        }
      },
      error: ''
    },
    certificationVacancies: [
      {
        certification: {
          id: 1,
          name: 'certification'
        },
        vacancy_details: {
          cycle_id: 1,
          projects_certification_id: 1,
          hasApplied: true
        }
      }
    ],
    loading: false,
    singleCertification: {
      id: 1,
      name: 'Testing',
      description: 'Test'
    },
    fetchAllVacancies: jest.fn()
  };
  let wrapper;

  const setUp = (propsOverride = {}) =>
    shallow(<CertificationPage {...props} {...propsOverride} />);

  let propsOverride;

  it('should render without errors', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('it should execute go back in history when clicked', () => {
    wrapper = shallow(<CertificationPage {...props} />);
    wrapper.find('#nav').simulate('click');
    expect(props.history.goBack).toHaveBeenCalled();
  });

  it('should render the loader when getCertification loading is true', () => {
    propsOverride = {
      getCertification: {
        loading: true
      }
    };
    const componentWithLoader = setUp(propsOverride);
    const loaderComponent = componentWithLoader.find(<Loader size="small" />);
    expect(loaderComponent).toMatchSnapshot();
  });
});
