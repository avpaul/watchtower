/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './FileInfo.css';
import deleteIcon from '../../static/delete.svg';

const FileInfo = ({ name, url, format, removeSelectedFile }) => (
  <div className="document-info">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >{`${name}.${format}  Uploaded`}</a>
    <img
      src={deleteIcon}
      alt="Delete icon"
      onClick={() => {
        removeSelectedFile();
      }}
    />
  </div>
);

FileInfo.defaultProps = {
  name: '',
  url: '',
  format: ''
};

FileInfo.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  format: PropTypes.string,
  removeSelectedFile: PropTypes.func.isRequired
};

export default FileInfo;
