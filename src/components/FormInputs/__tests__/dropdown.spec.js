import React from 'react';
import { shallow, mount } from 'enzyme';

import DropdownInput from '../dropdownInput';

describe('Dropdown Input ', () => {
  const defaultProps = {
    name: 'Name',
    parent: {
      setState: jest.fn(),
      state: {}
    },
    label: 'Type',
    className: 'wt-dropdown',
    placeholder: '-- Select --',
    comment: 'No comment',
    options: [
      {
        value: 'internal',
        label: 'Internal'
      },
      {
        value: 'external',
        label: 'External'
      }
    ]
  };

  /**
   * Sets up a enzyme wrapper
   * @param object PropsOverride A object of values used to override the props passed into
   * the component being tested
   * @param boolean shouldMount A bool value to select which type of wrapper to create
   * @return object { wrapper, props }
   */
  const setup = (propsOverride, shouldMount = false) => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shouldMount
      ? mount(<DropdownInput {...newProps} />)
      : shallow(<DropdownInput {...newProps} />);
    return { wrapper, props: newProps };
  };

  it('renders as expected', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with minimal config props', async () => {
    const { wrapper } = setup({
      label: '',
      className: null,
      placeholder: '',
      comment: null
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('focus on input successfully', () => {
    const { wrapper } = setup(null, true);
    const spyOnInputFocus = jest.spyOn(
      wrapper.instance().dropdownInputRef.current,
      'focus'
    );
    wrapper.instance().focus();
    expect(spyOnInputFocus).toHaveBeenCalled();
  });

  it('tests the retrieval of input value', () => {
    const { wrapper } = setup();
    const input = wrapper.find('select');
    input.simulate('change', {
      target: { value: defaultProps.options[0].value }
    });
    expect(wrapper.instance().isValid()).toBe(true);
    expect(wrapper.instance().getValue()).toBe(defaultProps.options[0].value);
  });
});
