import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectFormRight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTextInputs = (renderTextInput, project) => (
    <React.Fragment>
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
    </React.Fragment>
  );

  render() {
    const { projectDetails, renderTextInput, renderUploadInput } = this.props;
    const projectInfomation = projectDetails || {};

    return (
      <div className="col-12 col-lg-6">
        <div className="row ml-0 mr-0">
          {this.renderTextInputs(renderTextInput, projectInfomation)}
          {renderUploadInput({
            name: 'logo',
            label: 'Project Logo',
            documents: projectInfomation.logo ? [projectInfomation.logo] : [],
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
  renderTextInput: PropTypes.func.isRequired,
  renderUploadInput: PropTypes.func.isRequired,
  projectDetails: PropTypes.shape().isRequired
};

export default ProjectFormRight;
