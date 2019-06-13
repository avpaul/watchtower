import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectFormRight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { project, renderTextInput, renderUploadInput } = this.props;
    return (
      <div className="col-12 col-lg-6">
        <div className="row ml-0 mr-0">
          {renderTextInput({
            name: 'tagline',
            label: 'Tagline',
            inputValue: project.tagline,
            length: 120
          })}
          {renderTextInput({
            name: 'about',
            label: 'About',
            inputValue: project.about,
            type: 'textarea'
          })}
          {renderUploadInput({
            name: 'logo',
            label: 'Project Logo',
            documents: project.logo ? [project.logo] : [],
            count: 1,
            type: 'images',
            buttonLabel: 'Upload Logo'
          })}
        </div>
      </div>
    );
  }
}

ProjectFormRight.propTypes = {
  project: PropTypes.shape().isRequired,
  renderTextInput: PropTypes.func.isRequired,
  renderUploadInput: PropTypes.func.isRequired
};

export default ProjectFormRight;
