import React from 'react';
import { shallow } from 'enzyme';
import CertificationPage from '../CertificationPage';

describe('Test the certification page', () => {
  const props = {
    getCertification: {
      loading: false,
      data: {
        name: 'Testing',
        description: 'Test description',
        exclusive: true
      }
    },
    getCertificationAction: jest.fn(),
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        certificationId: '1'
      }
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
      certificationApplication: {
        loading: true
      }
    };
    const componentWithLoader = setUp(propsOverride);
    const {
      loading
    } = componentWithLoader.instance().props.certificationApplication;
    expect(loading).toBeTruthy();
    const loaderComponent = componentWithLoader.find(<Loader size="small" />);
    expect(loaderComponent).toMatchSnapshot();
  });

  it('should not render the submit button when loading is false', () => {
    propsOverride = {
      certificationApplication: {
        loading: false
      }
    };

    const componentWithoutLoader = setUp(propsOverride);
    const {
      loading
    } = componentWithoutLoader.instance().props.certificationApplication;
    expect(loading).toBeFalsy();
    expect(loading).toMatchSnapshot();
  });

  it('should render a toast error when an error occurs', () => {
    propsOverride = {
      certificationApplication: {
        error: 'You have done something bad'
      }
    };
    const component = setUp({ ...propsOverride });
    component.instance().showNotification();
    expect(component).toMatchSnapshot();
  });
  it('should render a toast success notification', () => {
    propsOverride = {
      certificationApplication: {
        error: null
      }
    };
    const component = setUp({ ...propsOverride });
    component.instance().showNotification();
    expect(component).toMatchSnapshot();
  });

  it('it should show not exclusive', () => {
    const newProps = { ...props, data: { exclusive: false } };
    wrapper = shallow(<CertificationPage {...newProps} />);
  });

  it('it should execute onClick event', () => {
    wrapper = shallow(<CertificationPage {...props} />);
    wrapper.find('#nav').simulate('click');
  });
});
