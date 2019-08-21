import React from 'react';
import PropTypes from 'prop-types';

import './StackRectangle.scss';

const StackRectangle = ({ stackName }) => (
  <span className="stackClass">{stackName}</span>
);

StackRectangle.propTypes = {
  stackName: PropTypes.string.isRequired
};

export default StackRectangle;
