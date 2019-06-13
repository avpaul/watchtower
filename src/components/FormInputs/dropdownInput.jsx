/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import {
  COMPONENT_STATUS_CLASS,
  COMPONENT_STATUS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps,
  attachToParentComponent
} from './helpers';

import './dropdownInput.css';

class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.defaultStatus,
      alertText: '',
      inputValue: props.inputValue,
      selections: []
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
  handleValueChange = e => {
    const { multipleSelection, options, defaultStatus } = this.props;
    const { selections } = this.state;

    if (multipleSelection) {
      const selectedOption = options.find(
        option => `${option.id}` === e.target.value
      );
      if (selectedOption) selections.push(selectedOption);
    }
    return this.setState({
      inputValue: e.target.value,
      selections,
      status: defaultStatus,
      alertText: ''
    });
  };

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
    const { inputValue, selections } = this.state;
    const { multipleSelection } = this.props;
    return multipleSelection ? selections.length !== 0 : inputValue !== '';
  };

  /**
   * Gets the value of the input
   *
   * @return string The input value
   */
  getValue = () => {
    const { inputValue, selections } = this.state;
    const { multipleSelection } = this.props;
    return multipleSelection ? selections : inputValue;
  };

  filterOptions = () => {
    const { selections } = this.state;
    const { options } = this.props;

    return options.filter(
      option => !selections.find(selection => selection.id === option.id)
    );
  };

  deSelect = item => {
    const { selections } = this.state;
    this.setState({
      selections: selections.filter(selection => selection.id !== item.id)
    });
  };

  addSelection = item => {
    const { selections } = this.state;
    const id =
      process.env.NODE_ENV === 'test'
        ? 0
        : window.crypto.getRandomValues(new Uint16Array(6))[0];
    selections.push({
      name: item,
      label: item,
      id
    });
    this.setState({ selections });
  };

  /**
   * Manually sets the state of the input component
   *
   * @param string status A status option pre-defined for the input component
   * @param string alertText Alert info to notify the user why the input is invalid.
   * This is optional.
   */
  setStatus = (status, alertText = '') => {
    const statusIndex = COMPONENT_STATUS.findIndex(string => string === status);
    this.setState({
      status: statusIndex > 0 ? statusIndex : 0,
      alertText
    });
  };

  renderDropdown = () => {
    const { inputValue } = this.state;
    const { placeholder, name, className } = this.props;

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
          {this.filterOptions().map(item => (
            <option value={item.id} key={arrayKey(item)}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  renderSelections = () => {
    const { selections } = this.state;
    const { className } = this.props;

    if (selections.length === 0) return null;

    return (
      <div className={`${className}__selections`}>
        {selections.map(item => (
          <div className={`${className}__selection`} key={arrayKey(item)}>
            {item.label}
            <span
              onClick={() => {
                this.deSelect(item);
              }}
              role="button"
              tabIndex={-1}
            >
              x
            </span>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { status, alertText } = this.state;
    const { className, label, comment, name } = this.props;
    const errorClass = `alert${
      alertText === '' ? '--disabled' : ' alert-danger mt-2'
    }`;
    return (
      <div
        className={`${className} ${className}--${
          COMPONENT_STATUS_CLASS[status]
        } mb-4`}
      >
        <label htmlFor={name}>{label}</label>
        {this.renderDropdown()}
        {this.renderSelections()}

        <div className={errorClass} role="alert">
          {alertText}
        </div>
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
  inputValue: PropTypes.string,
  options: PropTypes.instanceOf(Array),
  multipleSelection: PropTypes.bool
};

DropdownInput.defaultProps = {
  ...defaultReactiveUIDefaultProps,
  className: 'wt-dropdown',
  label: '',
  comment: '',
  inputValue: '',
  placeholder: '',
  options: [],
  multipleSelection: false
};

export default DropdownInput;
