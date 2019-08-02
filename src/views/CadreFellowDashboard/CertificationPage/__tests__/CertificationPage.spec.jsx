import React from 'react';
import { shallow } from 'enzyme';
import CertificationPage from '../CertificationPage';
import Loader from '../../../../components/Loader/Loader';

describe('Test the certification page', () => {
  const props = {
    getCertification: {
      loading: false,
      data: {
        name: 'Testing',
        description: 'Test description',
        exclusive: true,
        id: 1,
        applications: [
          {
            fellow_id: '-PUEHGE8716LJH'
          }
        ]
      },
      error: ''
    },
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
    }
  };
  let wrapper;

  const setUp = (propsOverride = {}) =>
    shallow(<CertificationPage {...props} {...propsOverride} />);

  let propsOverride;

  it('should render without errors', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('should render a button for users to be able to apply for a certification', () => {
    const component = setUp();
    const submitButton = component.find('button');
    expect(submitButton).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should trigger certification application function when apply button is clicked', () => {
    const component = setUp(propsOverride);
    component.find('button').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should render the button loader when loading is true', () => {
    propsOverride = {
      loading: true
    };
    const componentWithLoader = setUp(propsOverride);
    const { loading } = componentWithLoader.instance().props;
    expect(loading).toBeTruthy();
    const loaderComponent = componentWithLoader.find(<Loader size="small" />);
    expect(loaderComponent).toMatchSnapshot();
  });

  it('should not render the submit button when loading is false', () => {
    propsOverride = {
      loading: false
    };

    const componentWithoutLoader = setUp(propsOverride);
    const { loading } = componentWithoutLoader.instance().props;
    expect(loading).toBeFalsy();
    expect(loading).toMatchSnapshot();
  });

  it('it should show not exclusive', () => {
    const newProps = { ...props, data: { exclusive: false } };
    wrapper = shallow(<CertificationPage {...newProps} />);
  });

  it('it should execute onClick event', () => {
    wrapper = shallow(<CertificationPage {...props} />);
    wrapper.find('#nav').simulate('click');
  });

  it('should disable the apply button when a user has applied for a certification already', () => {
    const component = setUp();
    component.setState({ userHasApplied: true });
    expect(component.find('button#buttonDisabled').length).toBe(1);
  });

  it('should render the apply button when a user has not applied for a certification', () => {
    const component = setUp();
    expect(component.find('button.apply-btn').length).toBe(1);
  });

  it('it should call the check checkIfUserHasApplied function when the component updates', () => {
    const component = setUp();
    component.setProps({
      getCertification: {
        loading: true,
        data: {
          applications: [
            {
              fellow_id: '-PUEHGE8716LJH'
            }
          ]
        }
      }
    });

    expect(component.state('userHasApplied')).toBeTruthy();
  });
});
