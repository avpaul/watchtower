import PropTypes from 'prop-types';
import arrayOfObjectsSorter from '../../utils/sortArray';

export const COMPONENT_STATUS = [
  'normal',
  'fail',
  'success',
  'loading',
  'warning',
  'invalid',
  'valid'
];

export const COMPONENT_STATUS_CLASS = [
  'normal',
  'fail',
  'success',
  'loading',
  'warning',
  'fail',
  'success'
];

export const attachToParentComponent = component => {
  const { componentStateKey, parent, name } = component.props;
  parent.setState(state => ({
    [componentStateKey]: {
      ...state[componentStateKey],
      [name]: component
    }
  }));
};

/**
 * A generic helper function to update the status of a reactive component
 *
 * @param object component The input component
 * @param string status A status option pre-defined for the input component
 * @param string alertText Alert info to notify the user why the input is invalid.
 * This is optional.
 */
export const setStatusHandler = (component, status, alertText = '') => {
  const statusIndex = COMPONENT_STATUS.findIndex(string => string === status);
  component.setState({
    status: statusIndex > 0 ? statusIndex : 0,
    alertText
  });
};

/**
 * Processes the list of options in order to append a label to each new element
 * and sort the options.
 *
 * @param array data A list of dropdown options
 * @param string sortKey The option value key to use to sort and append a label with
 * @return array Sorted list of options
 */
export const processDropdownOptions = (data, sortKey) =>
  data.sort(arrayOfObjectsSorter(sortKey)).map(option => ({
    ...option,
    label: option[sortKey]
  }));

export const defaultReactiveUIProps = {
  defaultStatus: PropTypes.number,
  componentStateKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  parent: PropTypes.instanceOf(Object).isRequired
};

export const defaultReactiveUIDefaultProps = {
  defaultStatus: 0,
  componentStateKey: 'inputs'
};

export default {
  COMPONENT_STATUS,
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps,
  attachToParentComponent
};
