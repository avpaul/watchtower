import React from 'react';
import PropTypes from 'prop-types';
import '../FormInputs/textInput.css';
import AddIcon from '../../static/plus.png';
import { urlRegex } from '../../utils/regex';

const AddProjectLinksForm = ({
  projectLinks,
  textInputChange,
  addNewProjectLink,
  tooltipMessage
}) => (
  <div className="form-container">
    <form className="url-upload">
      {projectLinks.map((projectLink, index) => (
        <div className="input-group wt-text-input wt-text-input--normal mb-3">
          <input
            type="url"
            placeholder="https://example.com"
            value={projectLink}
            onChange={textInputChange(index)}
            required
          />
          {!urlRegex.test(projectLink) && projectLink !== '' ? (
            <span className="visible-error">Please enter a valid URL</span>
          ) : (
            <span />
          )}
        </div>
      ))}
    </form>
    <button
      type="button"
      onClick={addNewProjectLink}
      className="url-upload-button"
    >
      <span className="tooltiptext">{tooltipMessage}</span>
      <img src={AddIcon} alt="Add icon" />
    </button>
  </div>
);

AddProjectLinksForm.propTypes = {
  projectLinks: PropTypes.instanceOf(Array).isRequired,
  textInputChange: PropTypes.func.isRequired,
  addNewProjectLink: PropTypes.func.isRequired,
  tooltipMessage: PropTypes.string
};

AddProjectLinksForm.defaultProps = {
  tooltipMessage: ''
};

export default AddProjectLinksForm;
