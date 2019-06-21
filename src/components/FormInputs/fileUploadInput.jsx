/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attachToParentComponent } from './helpers';
import FileInfo from '../FileInfo';
import './fileUploadInput.css';

const uploadTypes = {
  images: ['png', 'jpg', 'jpeg', 'svg', 'svgz'],
  all: null
};

class FileUploadInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: props.documents
    };
  }

  componentDidMount() {
    attachToParentComponent(this);
  }

  hasContent = () => {
    const { documents } = this.state;
    return documents.length !== 0;
  };

  getValue = () => {
    const { documents } = this.state;
    const { name } = this.props;
    if (name === 'logo' && documents.length === 0) {
      return null;
    }
    return documents;
  };

  /**
   *
   * Renders the button for uploads with different style
   * @param label
   * @memberof FileUploadInput
   */
  displayDocumentInput = label => (
    <button onClick={this.showWidget} type="button">
      {label}
    </button>
  );

  getCloudinaryConfig = () => {
    const { count, type } = this.props;
    return {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      text: { 'sources.local.drop_or': 'Drop Files here or' },
      sources: ['local'],
      multiple: count !== 1,
      clientAllowedFormats: uploadTypes[type]
    };
  };

  getWidget = () =>
    window.cloudinary.createUploadWidget(
      this.getCloudinaryConfig(),
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const { original_filename, url, public_id, format } = result.info;
          this.setDocumentState(original_filename, url, public_id, format);
        }
      }
    );

  /**
   *
   * Opens the cloudinary widget
   * @memberof FileUploadInput
   */
  showWidget = () => {
    this.widget.open();
  };

  /**
   *set document state based on cloudinary response
   *@param {string} original_filename
   *@param {string} url
   *@param {string} public_id
   *@param {string} format
   * @memberof FileUploadInput
   */
  setDocumentState = (original_filename, url, public_id, format) => {
    const { documents } = this.state;
    const { count } = this.props;
    const document = {
      name: original_filename,
      url,
      id: public_id,
      format
    };
    if (count === 0 || documents.length < count) {
      return this.setState({ documents: [...documents, document] });
    }
    return false;
  };

  /**
   *
   *render component with uploaded file details
   * @param inputName
   * @memberof FileUploadInput
   */
  renderDocumentsInfo = () => {
    const { documents } = this.state;
    return this.renderDocumentDetailsComponent(documents);
  };

  /**
   * render a list of components with document names
   * @param {array} documents
   * @returns {component} FileInfo
   * @memberof FileUploadInput
   */
  renderDocumentDetailsComponent = documents =>
    documents.map(details => {
      const props = {
        ...details,
        removeSelectedFile: () => this.handleRemoveSelectedFile(details.id)
      };
      return <FileInfo key={details.id} {...props} />;
    });

  /**
   * remove the displayed document or logo component when
   * the 'X' icon is clicked
   * @param {string} fileType
   * @param {string} fileId
   * @memberof FileUploadInput
   */
  handleRemoveSelectedFile = fileId => {
    const { documents } = this.state;
    this.setState({
      documents: documents.filter(document => document.id !== fileId)
    });
  };

  render() {
    const { name, label, comment, buttonLabel } = this.props;
    let finalLabel = name || label;
    finalLabel = finalLabel.replace(' ', '');
    this.widget = this.getWidget();

    return (
      <div className="upload-input mb-4">
        <label htmlFor={finalLabel}>{label}</label>
        {this.renderDocumentsInfo(name)}
        {this.displayDocumentInput(buttonLabel)}

        <div
          className={`upload-input__comment--${
            comment !== '' ? 'active' : 'disabled'
          }`}
        >
          {comment}
        </div>
      </div>
    );
  }
}

FileUploadInput.propTypes = {
  componentStateKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  parent: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  comment: PropTypes.string,
  documents: PropTypes.instanceOf(Array),
  count: PropTypes.number,
  buttonLabel: PropTypes.string
};

FileUploadInput.defaultProps = {
  componentStateKey: 'inputs',
  type: 'all',
  label: '',
  comment: '',
  documents: [],
  count: 0,
  buttonLabel: 'Select'
};

export default FileUploadInput;
