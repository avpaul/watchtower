import React from 'react';
import PropTypes from 'prop-types';

const RenderItem = ({ title, children }) => (
  <div className="row title">
    <div className="rectangle" />
    <div className="content">
      <b className="spacing">{title}:</b>
      {children}
    </div>
  </div>
);

RenderItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default RenderItem;
