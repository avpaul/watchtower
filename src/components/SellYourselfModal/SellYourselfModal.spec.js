import React from 'react';
import { shallow } from 'enzyme';

import SellYourselfModal from './SellYourselfModal';
import Loader from '../Loader/Loader';
import Fixtures from '../../__mocks__/roleApplicationData.json';

describe('sell yourself modal', () => {
  const props = {
    title: 'Data Engineering',
    id: 1,
    buttonLabel: 'Apply for this certification',
    submitHandler: jest.fn(),
    modalHandler: jest.fn(),
    showModal: false,
    applyForCertification: jest.fn(),
    loading: false,
    data: {},
    error: {}
  };

  const setUp = (propsOverride = {}) =>
    shallow(<SellYourselfModal {...props} {...propsOverride} />);

  let propsOverride;

  it('renders without errors', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('should render an input button for users to provide a reason for applying for a certification', () => {
    const component = setUp();
    const input = component.find('textarea.form-control');
    expect(input).toHaveLength(1);
  });

  it('should render a button for users to submit their reason for applying for a certification', () => {
    const component = setUp();
    const submitButton = component.find('button.apply-btn');
    expect(submitButton).toHaveLength(1);
  });

  it('should update the input when user types into the input box', () => {
    const component = setUp();
    component
      .find('textarea.form-control')
      .simulate('change', { target: { value: 'Hello' } });
    expect(component.state().reason).toBe('Hello');
  });

  it('should call the submitHandler function when a user clicks on the submit button', () => {
    const component = setUp();
    component.setState({
      reason: 'Here is my reason for applying to this certifications'
    });
    component.find('button.apply-btn').simulate('click');
    expect(props.submitHandler).toBeCalled();
  });

  it('should render the loader when the request is in progress and loading prop is set to true', () => {
    propsOverride = {
      loading: true,
      data: {},
      error: null
    };

    const component = setUp(propsOverride);
    expect(component.find(Loader)).toHaveLength(1);
  });

  it('should render the success notification toast when the application submission succeeds', () => {
    propsOverride = {
      loading: false,
      data: {},
      error: null
    };

    const component = setUp(propsOverride);
    component.find('button.apply-btn').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should render the error notification toast when the application submission fails', () => {
    propsOverride = {
      loading: false,
      data: {},
      error: {
        reason_for_applying: [
          {
            reason_for_applying: 'You provided a wrong input'
          }
        ]
      }
    };

    const component = setUp(propsOverride);
    component.find('button.apply-btn').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should call the function to close the modal when onClose is triggered', () => {
    const component = setUp();
    component.instance().onClose();
    expect(props.modalHandler).toBeCalled();
  });

  it('should render the appropriate feedback when the user input is less than 50', () => {
    const component = setUp();
    component.setState({
      reason: 'Hey guys, I am here'
    });
    expect(component.find('.feedback-text').text()).toBe(
      `C'mon, don't sell yourself short!. 😏`
    );
  });

  it('should render the feedback to the user when the input is up to 50 and less than 500', () => {
    const component = setUp();
    component.setState({
      reason: Fixtures.validApplication_reason
    });
    expect(component.find('.feedback-text').text()).toBe(
      `Yeah! Keep it nice, short and simple. 👌`
    );
  });

  it('should render the feedback to the user when the input is up to more than 500', () => {
    const component = setUp();
    component.setState({
      reason: Fixtures.invalidApplication_reason
    });
    expect(component.find('.feedback-text').text()).toBe(
      `OK, maybe not your full CV, 10x Engineer. 😜`
    );
  });
});
