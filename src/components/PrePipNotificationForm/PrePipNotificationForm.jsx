import React, { Component } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';
import PrePipNotificationOutline from './PrePipNotificationOutline';
import './PrePipNotificationForm.scss';

class PrePipNotificationForm extends Component {
  constructor() {
    super();
    this.input = React.createRef();
  }

  printDocument = () => {
    const input = this.input.current;
    html2canvas(input, { scale: '2' }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      this.createPdf(imgData);
    });
  };

  createPdf = imgData => {
    const pdf = new JsPdf({ orientation: 'p', unit: 'mm' });
    pdf.internal.scaleFactor = 1;
    pdf.addImage(imgData, 'JPEG', 5, 10, 200, 150);
    pdf.save('download.pdf');
  };

  render() {
    const { fellowFeedback, history } = this.props;
    if (fellowFeedback.fellowFeedback)
      if (Object.keys(fellowFeedback.fellowFeedback).length === 0)
        history.push('/feedback');
    return (
      <div className="prepipOutline">
        <div className="feedbackDashboard container-fluid">
          <div className="row" ref={this.input}>
            <PrePipNotificationOutline
              fellowFeedback={fellowFeedback}
              serialNumber={parseInt(fellowFeedback.index, 10) + 1}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn-print-prepip-form"
            onClick={this.printDocument}
          >
            Download as PDF
          </button>
        </div>
      </div>
    );
  }
}

PrePipNotificationForm.propTypes = {
  fellowFeedback: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired
};

PrePipNotificationForm.defaultProps = {
  fellowFeedback: undefined
};
export default PrePipNotificationForm;
