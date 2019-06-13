import React from 'react';
import PropTypes from 'prop-types';
import '../FormInputs/textInput.css';
import AddIcon from '../../static/plus.png';

const AddProjectLinksForm = ({
  projectLinks,
  textInputChange,
  addNewProjectLink,
  tooltipMessage,
  success
}) => (
  <div className="form-container">
    <button
      type="button"
      onClick={addNewProjectLink}
      className="url-upload-button"
    >
      <span className="tooltiptext">{tooltipMessage}</span>
      <img src={AddIcon} alt="Add icon" />
    </button>
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
          {success === false && index === 0 ? (
            <span className="visible-error">Please enter a valid URL</span>
          ) : (
            <span />
          )}
        </div>
      ))}
    </form>
  </div>
);

AddProjectLinksForm.propTypes = {
  projectLinks: PropTypes.instanceOf(Array).isRequired,
  textInputChange: PropTypes.func.isRequired,
  addNewProjectLink: PropTypes.func.isRequired,
  tooltipMessage: PropTypes.string,
  success: PropTypes.bool
};

AddProjectLinksForm.defaultProps = {
  tooltipMessage: '',
  success: true
};

export default AddProjectLinksForm;
