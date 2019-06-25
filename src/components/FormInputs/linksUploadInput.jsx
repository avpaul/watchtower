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
      links: ['', '', '', '', ''],
      tooltipMessage: 'Add New Link'
    };
  }

  componentDidMount() {
    attachToParentComponent(this);
  }

  /**
   * get number of invalid links
   * @return array invalidLinks
   * @memberof LinksUploadInput
   */
  getInvalidLinks = () => {
    const { links } = this.state;
    const invalidLinks = links.filter(
      link => !urlRegex.test(link) && link !== ''
    );
    return invalidLinks;
  };

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
   * @param links
   * @param tooltipMessage
   * @memberof LinksUploadInput
   * @returns Modal
   */
  renderLinksUploadModal = (links, tooltipMessage) => (
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
            <h1>Add Relevant links</h1>
          </div>
          <div className="modal-body">
            {this.renderModalBody(links, tooltipMessage)}
          </div>
          {this.renderModalFooter()}
        </div>
      </div>
    </div>
  );

  /**
   * @param links
   * @param tooltipMessage
   * @memberof LinksUploadInput
   * @returns AddProjectLinksForm component
   */
  renderModalBody = (links, tooltipMessage) => (
    <AddProjectLinksForm
      textInputChange={this.handleTextInputChange}
      addNewProjectLink={this.handleAddNewProjectLink}
      projectLinks={links}
      tooltipMessage={tooltipMessage}
    />
  );

  /**
   *
   * @param links gotten from state
   * @memberof LinksUploadInput
   * @returns Modal footer
   */
  renderModalFooter = () => {
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
          'data-dismiss': this.getInvalidLinks().length === 0 ? 'modal' : null
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
        links: [...links, ''],
        tooltipMessage: 'Add New Link'
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
    if (links.includes('') && !doneButton) {
      this.setState({
        tooltipMessage: 'please fill all inputs before adding a new one'
      });
      return false;
    }

    if (this.getInvalidLinks().length > 0) {
      this.setState({
        tooltipMessage: 'please enter a valid URL'
      });
      return false;
    }
    return true;
  };

  /**
   *
   * closes modal when cancel is clicked
   * @memberof LinksUploadInput
   */
  handleCancelButton = () => {
    this.setState({
      links: ['', '', '', '', ''],
      tooltipMessage: 'Add New Link'
    });
  };

  render() {
    const { name, label, buttonLabel } = this.props;
    const { links, tooltipMessage } = this.state;
    let finalLabel = name || label;
    finalLabel = finalLabel.replace(' ', '');

    return (
      <div className="upload-input mb-4">
        <label htmlFor={finalLabel}>{label}</label>
        {this.displayTinyLinksContainer()}
        {this.displayLinkUploadInput(buttonLabel, '#add-links-modal')}
        {this.renderLinksUploadModal(links, tooltipMessage)}
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
