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
        id: 'internal',
        label: 'Internal'
      },
      {
        id: 'external',
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

  /**
   * Simulates a user clicking one of the dropdown inputs
   *
   * @param object wrapper An enzyme instance
   * @param var value A value used to simulate an option clicked
   * @param number optionIndex The index of the option amongst a list of options
   */
  const addDropdownValue = (wrapper, value, optionIndex = 0) => {
    const input = wrapper.find('.wt-dropdown__select__button');
    input.simulate('click');
    const option = wrapper.find('.wt-dropdown__list__item');
    option.at(optionIndex).simulate('click', {
      target: { id: value }
    });
  };

  /**
   * Simulates a user cancelling one of the selected options
   *
   * @param object wrapper An enzyme instance
   * @param number selectionIndex The index of the option amongst a list of options
   */
  const deSelectADropdownOption = (wrapper, selectionIndex) => {
    const selections = wrapper.find(`.wt-dropdown__selection span`);
    selections.at(selectionIndex).simulate('click');
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
    addDropdownValue(wrapper, defaultProps.options[0].id);
    expect(wrapper.instance().isValid()).toBe(true);
    expect(wrapper.instance().getValue()).toBe(defaultProps.options[0]);
  });

  it('tests the selection of multiple inputs', () => {
    const { wrapper } = setup({ multipleSelection: true });
    addDropdownValue(wrapper, defaultProps.options[0].id);
    addDropdownValue(wrapper, defaultProps.options[1].id);
    expect(wrapper.instance().isValid()).toBe(true);
    expect(wrapper.instance().getValue().length).toBe(2);

    deSelectADropdownOption(wrapper, 0);
    expect(wrapper.instance().isValid()).toBe(true);
    expect(wrapper.instance().getValue()[0].id).toBe(
      defaultProps.options[1].id
    );
  });

  it('executes the deSelect function', () => {
    const { wrapper } = setup();
    wrapper.setState({
      selections: [{ id: Date.now() }]
    });
    wrapper.instance().deSelect({ id: 'id' });
    expect(wrapper.state('selections')).toBeTruthy();
  });

  it('trigger the deSelect function when the "X" icon is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({
      selections: [{ id: Date.now(), label: 'randomlabel' }]
    });
    const deSelectSpy = jest.spyOn(wrapper.instance(), 'deSelect');
    wrapper.find('span').simulate('click');
    expect(deSelectSpy).toHaveBeenCalled();
  });
});
