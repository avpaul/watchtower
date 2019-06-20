/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import {
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps,
  attachToParentComponent,
  setStatusHandler
} from './helpers';

import './dropdownInput.css';

// Used to ensure a single dropdown is opened
let dropdownOnFocus = {};

class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.defaultStatus,
      alertText: '',
      inputValue: props.inputValue,
      selections: [],
      show: false,
      searchValue: ''
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
    const value = options.find(option => `${option.id}` === e.target.id);
    if (multipleSelection && value) selections.push(value);
    return this.setState({
      inputValue: value || {},
      show: false,
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
    return multipleSelection ? selections.length !== 0 : !!inputValue.label;
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
    const { selections, searchValue } = this.state;
    const { options } = this.props;

    return options.filter(option => {
      if (selections.find(selection => selection.id === option.id))
        return false;
      if (searchValue && !(option.label.toLowerCase().search(searchValue) >= 0))
        return false;
      return true;
    });
  };

  /**
   * Deselect a selected option. This is enabled when this component allows multiple selections.
   *
   * @param object item The selected option to remove
   */
  deSelect = item => {
    const { selections } = this.state;
    this.setState({
      selections: selections.filter(selection => selection.id !== item.id)
    });
  };

  /**
   * Adds an option. This is enabled when this component allows multiple selections.
   *
   * @param object item The selected option to add
   */
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
  setStatus = (status, alertText = '') =>
    setStatusHandler(this, status, alertText);

  /**
   * Toggles the dropdown list
   */
  toggleDropdown = () =>
    this.setState(
      state => ({ show: !state.show }),
      () => {
        const { name } = this.props;
        if (dropdownOnFocus.props && dropdownOnFocus.props.name !== name)
          dropdownOnFocus.setState({ show: false });
        dropdownOnFocus = this;
      }
    );

  /**
   * Handles the change of the search input
   *
   * @param object e Event object
   */
  handleSearchChange = e => this.setState({ searchValue: e.target.value });

  renderSearchInput = searchValue => {
    const { enableSearch } = this.props;
    if (!enableSearch) return null;

    return (
      <input
        type="text"
        placeholder="Search ..."
        value={searchValue}
        onChange={this.handleSearchChange}
      />
    );
  };

  renderOptions = (className, searchValue) => (
    <div className={`${className}__list`}>
      {this.renderSearchInput(searchValue)}
      <div className={`${className}__list__items`}>
        {this.filterOptions().map(item => (
          <div
            id={item.id}
            key={arrayKey(item)}
            className={`${className}__list__item`}
            onClick={this.handleValueChange}
            onKeyPress={this.handleValueChange}
            tabIndex="-1"
            role="button"
          >
            {item.label}
          </div>
        ))}
      </div>
      {this.getExtras()}
    </div>
  );

  /**
   * Clones all the components passed in the extras props and attaches an onClick event handler to close the dropdown.
   * This is necessary to enable any additions to the dropdown to behave the same way as the default dropdown options
   */
  getExtras = () => {
    const { extras } = this.props;
    return React.Children.map(extras, extra =>
      React.cloneElement(extra, { onClick: this.toggleDropdown })
    );
  };

  renderDropdown = () => {
    const { inputValue, show, searchValue } = this.state;
    const { placeholder, className, name } = this.props;
    return (
      <div
        id={name}
        ref={this.dropdownInputRef}
        className={`${className}__select col-12 p-0`}
      >
        <div className={`${className}__select__value`}>
          <div className={`${className}__value`}>
            {inputValue.label || placeholder}
          </div>
          <button
            type="button"
            className={`${className}__select__button`}
            onClick={this.toggleDropdown}
          />
        </div>
        {show ? this.renderOptions(className, searchValue) : null}
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
              onKeyPress={() => {
                this.deSelect(item);
              }}
              role="button"
              tabIndex="-1"
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
        } mb-4 row mr-0 ml-0`}
      >
        <label htmlFor={name}>{label}</label>
        {this.renderDropdown()}
        {this.renderSelections()}

        <div className={errorClass} role="alert">
          {alertText}
        </div>
        {comment ? (
          <div className={`${className}__comment`}>{comment}</div>
        ) : null}
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
  multipleSelection: PropTypes.bool,
  extras: PropTypes.shape(),
  enableSearch: PropTypes.bool
};

DropdownInput.defaultProps = {
  ...defaultReactiveUIDefaultProps,
  className: 'wt-dropdown',
  label: '',
  comment: '',
  inputValue: '',
  placeholder: '',
  options: [],
  multipleSelection: false,
  extras: null,
  enableSearch: false
};

export default DropdownInput;
