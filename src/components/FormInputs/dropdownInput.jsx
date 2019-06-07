/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import {
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps,
  attachToParentComponent
} from './helpers';

import './dropdownInput.css';

class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.inputValue
    };

    this.dropdownInputRef = React.createRef();
  }

  componentDidMount() {
    attachToParentComponent(this);
  }

  /**
   * Handles the change of value in the input.
   *
   * @param object event An event object
   */
  handleValueChange = e => this.setState({ inputValue: e.target.value });

  /**
   * Sets the focus on the input
   */
  focus = () => this.dropdownInputRef.current.focus();

  /**
   * Checks if the component has a valid input value
   *
   * @return boolean
   */
  isValid = () => {
    const { inputValue } = this.state;
    return inputValue !== '';
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

  renderDropdown = () => {
    const { inputValue } = this.state;
    const { placeholder, options, name, className } = this.props;
    return (
      <div className={`${className}__select`}>
        <select
          id={name}
          ref={this.dropdownInputRef}
          name={name}
          onChange={this.handleValueChange}
          value={inputValue}
        >
          {placeholder !== '' ? <option value="">{placeholder}</option> : null}
          {options.map(item => (
            <option value={item.value} key={arrayKey(item)}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    const { status } = this.state;
    const { className, label, comment, name } = this.props;
    return (
      <div
        className={`${className} ${className}--${
          COMPONENT_STATUS_CLASS[status]
        } mb-4`}
      >
        <label htmlFor={name}>{label}</label>
        {this.renderDropdown()}

        <div className={`${className}__comment`}>{comment}</div>
      </div>
    );
  }
}

DropdownInput.propTypes = {
  ...defaultReactiveUIProps,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  comment: PropTypes.string,
  inputValue: PropTypes.string
};

DropdownInput.defaultProps = {
  ...defaultReactiveUIDefaultProps,
  className: 'wt-dropdown',
  label: '',
  comment: '',
  inputValue: '',
  placeholder: ''
};

export default DropdownInput;
