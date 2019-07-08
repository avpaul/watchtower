/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIDefaultProps,
  defaultReactiveUIProps,
  attachToParentComponent,
  setStatusHandler
} from './helpers';

import './textInput.scss';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.defaultStatus,
      alertText: '',
      inputValue: props.inputValue,
      lastTyped: Date.now()
    };

    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    attachToParentComponent(this);
  }

  componentDidUpdate() {
    const component = this;
    const { status } = component.state;
    if ([1, 2].includes(status)) {
      const { defaultStatus } = component.props;
      setTimeout(
        () => {
          component.setState({ status: defaultStatus });
        },
        process.env.NODE_ENV === 'testing' ? 0 : 3000
      );
    }
  }

  /**
   * Handles the change of value in the input. It also triggers a validity check if the
   * user has paused for one second when typing. The validity check is done with the testInput
   * function provided as a prop to this component.
   *
   * @param object event An event object
   */
  handleValueChange = e => {
    const { length, testInput, alertText } = this.props;
    this.setState({
      lastTyped: Date.now(),
      inputValue: e.target.value.substr(0, length || 999)
    });

    setTimeout(() => {
      const { inputValue, lastTyped } = this.state;
      const lastChanged =
        process.env.NODE_ENV === 'test' ? Date.now() - 1001 : lastTyped;
      if (lastChanged >= 1000) {
        let status = 0;
        if (inputValue !== '') status = testInput(inputValue) ? 6 : 5;
        this.setState({
          status,
          alertText: status === 5 ? alertText : ''
        });
      }
    }, 1000);
  };

  /**
   * Sets the focus on the input
   */
  focus = () => this.textInputRef.current.focus();

  /**
   * Manually sets the state of the input component
   *
   * @param string status A status option pre-defined for the input component
   * @param string alertText Alert info to notify the user why the input is invalid.
   * This is optional.
   */
  setStatus = (status, alertText = '') =>
    setStatusHandler(this, status, alertText);

  /**
   * Checks if the component has a valid input value
   *
   * @return boolean
   */
  isValid = () => {
    const { status } = this.state;
    return status === 6;
  };

  /**
   * Gets the value of the input
   *
   * @return string The input value
   */
  getValue = () => {
    const { inputValue } = this.state;
    return inputValue;
  };

  /**
   * Renders a text input or a textarea input, according to the type prop provided in the props.
   *
   * @param string finalLabel The label of the input
   * @return JSX The input component
   */
  renderInput = finalLabel => {
    const { inputValue } = this.state;
    const { placeholder, type } = this.props;
    const props = {
      id: finalLabel,
      ref: this.textInputRef,
      type: 'text',
      value: inputValue,
      onChange: this.handleValueChange,
      placeholder
    };

    return type === 'textarea' ? (
      <textarea {...props} required rows="4" />
    ) : (
      <input {...props} />
    );
  };

  render() {
    const { alertText, status } = this.state;
    const { name, className, label, comment } = this.props;
    const finalLabel = (name || label).replace(' ', '');
    const commentClass = `${className}__comment--${
      !alertText && comment !== '' ? 'active' : 'disabled'
    }`;
    const errorClass = `alert${
      alertText === '' ? '--disabled' : ' alert-danger mt-2'
    }`;
    return (
      <div
        className={`input-group ${className} ${className}--${COMPONENT_STATUS_CLASS[status]} mb-3`}
      >
        <label htmlFor={finalLabel}>{label}</label>
        {this.renderInput(finalLabel)}

        <div className={errorClass} role="alert">
          {alertText}
        </div>
        <div className={commentClass}>{comment}</div>
      </div>
    );
  }
}

TextInput.propTypes = {
  ...defaultReactiveUIProps,
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  comment: PropTypes.string,
  inputValue: PropTypes.string,
  length: PropTypes.number,
  testInput: PropTypes.func,
  alertText: PropTypes.string
};

TextInput.defaultProps = {
  ...defaultReactiveUIDefaultProps,
  type: 'text',
  className: 'wt-text-input',
  label: '',
  comment: '',
  inputValue: '',
  alertText: '',
  placeholder: '',
  length: 999,
  testInput: () => true
};

export default TextInput;
