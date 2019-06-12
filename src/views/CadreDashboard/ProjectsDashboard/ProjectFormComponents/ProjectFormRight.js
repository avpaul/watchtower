import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectFormRight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { project, renderTextInput } = this.props;
    return (
      <div className="col-6">
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
        </div>
      </div>
    );
  }
}

ProjectFormRight.propTypes = {
  project: PropTypes.shape().isRequired,
  renderTextInput: PropTypes.func.isRequired
};

export default ProjectFormRight;
