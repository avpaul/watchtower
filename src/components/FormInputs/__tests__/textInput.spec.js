import React from 'react';
import { shallow, mount } from 'enzyme';
import waitForTest from 'wait-for-expect';
import cases from 'jest-in-case';

import TextInput from '../textInput';

describe('TextInput ', () => {
  const defaultProps = {
    name: 'Name',
    parent: {
      setState: jest.fn(),
      state: {}
    },
    label: 'Name',
    length: 30,
    className: 'wt-text-input',
    type: 'text',
    placeholder: 'Name Surname',
    comment: 'No comment',
    testInput: jest.fn()
  };

  /**
   * Sets up a enzyme wrapper
   * @param object PropsOverride A object of values used to override the props passed into the component being tested
   * @param boolean shouldMount A bool value to select which type of wrapper to create
   * @return object { wrapper, props }
   */
  const setup = (propsOverride, shouldMount = false) => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shouldMount
      ? mount(<TextInput {...newProps} />)
      : shallow(<TextInput {...newProps} />);
    return { wrapper, props: newProps };
  };

  /**
   * Tests the text input according to different scenarios
   * @param object testCase Contains values for a specified scenario
   * @param function testInputSpy A mock function to test an input check by using a function
   */
  const testTextInput = async (testCase, testInputSpy = null) => {
    const { wrapper } = setup({
      ...defaultProps,
      testInput: testCase.testInput
    });
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: testCase.value } });
    await waitForTest(() => {
      if (testInputSpy) expect(testInputSpy).toHaveBeenCalled();
      expect(wrapper.state('status')).toBe(testCase.status);
      expect(wrapper.instance().isValid()).toBe(testCase.status === 6);
    });
  };

  /**
   * Tests the set status method according to different scenarios
   * @param object testCase Contains the values for a specified scenario
   */
  const testSetStatusMethod = testCase => {
    const { wrapper } = setup();
    wrapper.instance().setStatus(...testCase.params);
    expect(wrapper.state('status')).toBe(testCase.statusNo);
  };

  it('renders as expected', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with minimal config props', async () => {
    const { wrapper } = setup({
      length: null,
      label: null,
      placeholder: null,
      className: null,
      type: null,
      comment: null,
      testInput: null
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders textarea input', () => {
    const { wrapper } = setup({ type: 'textarea' });
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the onChange action when function test is valid', async () => {
    const testInputSpy = jest.fn();
    const name = 'John Doe';
    const testInput = input => {
      testInputSpy();
      return name === input;
    };
    await testTextInput({ testInput, value: name, status: 6 }, testInputSpy);
  });

  it('focus on input successfully', () => {
    const { wrapper } = setup(null, true);
    const spyOnInputFocus = jest.spyOn(
      wrapper.instance().textInputRef.current,
      'focus'
    );
    wrapper.instance().focus();
    expect(spyOnInputFocus).toHaveBeenCalled();
  });

  cases(
    'tests the temporary state',
    async testCase => {
      const { wrapper } = setup(null, true);
      wrapper.instance().setStatus(testCase.name);
      expect(wrapper.state('status')).toBe(testCase.testStatus);
      await waitForTest(() => {
        expect(wrapper.state('status')).toBe(0);
      });
    },
    [
      {
        name: 'success',
        testStatus: 2
      },
      {
        name: 'fail',
        testStatus: 1
      }
    ]
  );

  it('sets the state of the input as valid', async () =>
    testSetStatusMethod({ params: ['valid'], statusNo: 6 }));

  it('sets the state of the input as invalid', async () =>
    testSetStatusMethod({ params: ['invalid', 'Invalid input'], statusNo: 5 }));

  it('sets the state of the input with invalid status', async () =>
    testSetStatusMethod({ params: ['correct'], statusNo: 0 }));
});
