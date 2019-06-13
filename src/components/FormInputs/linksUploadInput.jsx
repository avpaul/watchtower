/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Microlink from '@microlink/react';
import { attachToParentComponent } from './helpers';
import AddProjectLinksForm from '../ProjectLinksForm';
import { urlRegex } from '../../utils/regex';
import './linksUploadInput.css';

class LinksUploadInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [''],
      tooltipMessage: 'Add New Link',
      success: true
    };
  }

  componentDidMount() {
    attachToParentComponent(this);
  }

  /**
   * get value that will be sent to the server
   * @returns links
   * @memberof LinksUploadInput
   */
  getValue = () => {
    const { links } = this.state;
    const validLinks = links.filter(link => urlRegex.test(link) && link !== '');
    return validLinks.length > 0 ? JSON.stringify(validLinks) : null;
  };

  /**
   * returns preview for each valid link added
   * @returns ReactTinyLink
   * @memberof LinksUploadInput
   */
  displayLinkPreviews = validLinks =>
    validLinks.map(url => <Microlink url={url} />);

  /**
   * display sigle flexbox div to contain all links
   * @returns links-container
   * @memberof LinksUploadInput
   */
  displayTinyLinksContainer = () => {
    const validLinks = this.getValue();
    if (validLinks) {
      const validLinksArray = JSON.parse(validLinks);
      return (
        <div className="links-container">
          {this.displayLinkPreviews(validLinksArray)}
        </div>
      );
    }
    return <div />;
  };

  /**
   *
   * Renders the button for link uploads
   * @param label
   * @memberof LinksUploadInput
   */
  displayLinkUploadInput = (label, modalTarget) => (
    <button type="button" data-toggle="modal" data-target={modalTarget}>
      {label}
    </button>
  );

  /**
   * parameters gotten from the state
   * @param success
   * @param links
   * @param tooltipMessage
   * @memberof LinksUploadInput
   * @returns Modal
   */
  renderLinksUploadModal = (success, links, tooltipMessage) => (
    <div
      className="modal fade links-upload"
      id="add-links-modal"
      roled="dialog"
      aria-labelledby="#addLinksModal"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1>Add level-up links</h1>
          </div>
          <div className="modal-body">
            {this.renderModalBody(links, tooltipMessage, success)}
          </div>
          {this.renderModalFooter(links)}
        </div>
      </div>
    </div>
  );

  /**
   * @param links
   * @param tooltipMessage
   * @param success
   * @memberof LinksUploadInput
   * @returns AddProjectLinksForm component
   */
  renderModalBody = (links, tooltipMessage, success) => (
    <AddProjectLinksForm
      textInputChange={this.handleTextInputChange}
      addNewProjectLink={this.handleAddNewProjectLink}
      projectLinks={links}
      tooltipMessage={tooltipMessage}
      success={success}
    />
  );

  /**
   *
   * @param links gotten from state
   * @memberof LinksUploadInput
   * @returns Modal footer
   */
  renderModalFooter = links => {
    const buttonProps = {
      onClick: this.handleCancelButton,
      label: 'Cancel'
    };
    return (
      <div className="modal-footer">
        {this.renderButton({ ...buttonProps, 'data-dismiss': 'modal' })}
        {this.renderButton({
          label: 'Done',
          onClick: () => this.validateLastInput(true),
          'data-dismiss':
            urlRegex.test(links[0]) || links[0] === '' ? 'modal' : null
        })}
      </div>
    );
  };

  /**
   * @param buttonProps
   * @returns Button
   * @memberof LinksUploadInput
   */
  renderButton = buttonProps => (
    <button type="button" className="btn done-btn" {...buttonProps}>
      {buttonProps.label}
    </button>
  );

  /**
   * creates new input box for adding extra links
   * validates the previous link before allowing new creation
   *
   * @memberof LinksUploadInput
   */
  handleAddNewProjectLink = () => {
    if (this.validateLastInput()) {
      const { links } = this.state;
      this.setState({
        links: ['', ...links],
        tooltipMessage: 'Add New Link',
        success: true
      });
    }
  };

  /**
   * Makes sure our component is controlled
   * update state as input changes
   * @param newIndex index of the latest input box in the modal
   * @memberof LinksUploadInput
   */
  handleTextInputChange = newIndex => event => {
    const { links } = this.state;
    const newLinks = links.map((link, previousIndex) => {
      if (newIndex !== previousIndex) return link;
      return event.target.value;
    });
    this.setState({ links: newLinks, tooltipMessage: 'Add New Link' });
  };

  /**
   * validates the last input before another can be created
   * updates state where necessary
   * @param boolean doneButton
   * @memberof LinksUploadInput
   */
  validateLastInput = doneButton => {
    const { links } = this.state;
    if (links[0] === '' && !doneButton) {
      this.setState({
        tooltipMessage: 'please fill all inputs before adding a new one'
      });
      return false;
    }
    if (!urlRegex.test(links[0]) && links[0] !== '') {
      this.setState({
        tooltipMessage: 'please enter a valid URL',
        success: false
      });
      return false;
    }
    this.setState({
      success: true
    });
    return true;
  };

  /**
   *
   * closes modal when cancel is clicked
   * @memberof LinksUploadInput
   */
  handleCancelButton = () => {
    this.setState({
      links: [''],
      tooltipMessage: 'Add New Link',
      success: true
    });
  };

  render() {
    const { name, label, buttonLabel } = this.props;
    const { success, links, tooltipMessage } = this.state;
    let finalLabel = name || label;
    finalLabel = finalLabel.replace(' ', '');

    return (
      <div className="upload-input mb-4">
        <label htmlFor={finalLabel}>{label}</label>
        {this.displayTinyLinksContainer()}
        {this.displayLinkUploadInput(buttonLabel, '#add-links-modal')}
        {this.renderLinksUploadModal(success, links, tooltipMessage)}
      </div>
    );
  }
}

LinksUploadInput.propTypes = {
  componentStateKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  parent: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  links: PropTypes.instanceOf(Array)
};

LinksUploadInput.defaultProps = {
  componentStateKey: 'inputs',
  label: '',
  links: [],
  buttonLabel: 'Select'
};

export default LinksUploadInput;
