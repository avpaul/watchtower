import React from 'react';
import { shallow, mount } from 'enzyme';

import LinksUploadInput from '../linksUploadInput';

describe('TextInput ', () => {
  const defaultProps = {
    name: 'links',
    parent: {
      setState: jest.fn(),
      state: {}
    },
    label: 'Level-Up Links',
    buttonLabel: 'Select',
    links: ['https://www.mmm.com', 'randomstring']
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<LinksUploadInput {...newProps} />);
    return wrapper;
  };

  it('renders as expected', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('executes the displayTinyLinksContainer', () => {
    const wrapper = setup();
    wrapper.setState({
      links: ['https://www.mmm.com', 'randomstring']
    });
    wrapper.instance().displayTinyLinksContainer();
    expect.objectContaining({
      type: 'div',
      props: { className: 'links-container' }
    });
  });

  it('responds to the onClick function for the done button', () => {
    const wrapper = setup();
    wrapper.setState({
      links: ['']
    });
    wrapper
      .find('.done-btn')
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('.done-btn')
        .at(1)
        .prop('data-dismiss')
    ).toEqual('modal');
  });

  it('responds to the onClick function for the cancel button', () => {
    const wrapper = setup();
    wrapper.setState({
      links: ['']
    });
    wrapper
      .find('.done-btn')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.done-btn')
        .at(1)
        .prop('data-dismiss')
    ).toEqual('modal');
  });

  it('executes the handleAddNewProjectLink', () => {
    const wrapper = setup();
    const validateLastInput = jest.fn();
    validateLastInput.mockReturnValue(true);
    wrapper.setState({
      links: ['https://www.mmm.com', 'randomstring']
    });
    wrapper.instance().handleAddNewProjectLink();
    expect(wrapper.state().success).toEqual(true);
  });

  it('executes the handleTextInputChange and return updated link state', () => {
    const wrapper = mount(<LinksUploadInput {...defaultProps} />);
    const event = {
      target: { value: 'My new value' }
    };
    wrapper.setState({
      links: ['My new value', '']
    });
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'My new value' } });
    wrapper.instance().handleAddNewProjectLink(event);
    expect(wrapper.state().links).toEqual(['My new value', '']);
  });

  it('executes the validateLastInput', () => {
    const wrapper = setup();
    wrapper.setState({
      links: ['']
    });
    wrapper.instance().validateLastInput(false);
    expect(wrapper.state().tooltipMessage).toEqual(
      'please fill all inputs before adding a new one'
    );
  });
});
