import React from 'react';
import PropTypes from 'prop-types';

const RenderItem = ({ title, children }) => (
  <div className="row ml-0 title">
    <div className="rectangle" />
    <div className="content">
      <b className="spacing">{title}:</b>
      {children}
    </div>
  </div>
);

RenderItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

RenderItem.defaultProps = {
  children: ''
};

export default RenderItem;
