import PropTypes from 'prop-types';

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
