import React from 'react';
import PropTypes from 'prop-types';

import './PipFeedbackModal.scss';
import { getDate, getDayName } from '../../services/helper';
import PopupModal from '../../components/Modal/PopupModal';

export default function PipFeedbackModal({ feedback }) {
  let areasOfConcern = null;
  let feedbackFromTTL = null;
  let modalTitle = null;
  let modalSubtitle = null;

  if (feedback && feedback.type !== 'pre-pip') {
    modalTitle = 'PIP Feedback';
    modalSubtitle = `${getDayName(feedback.started_at)}, ${getDate(
      feedback.started_at
    )}`;
    if (feedback.pip_for_dev_pulse !== null) {
      areasOfConcern = feedback.pip_for_dev_pulse.attributes.map(attribute => (
        <li key={attribute.attribute}>
          {attribute.attribute.charAt(0).toUpperCase() +
            attribute.attribute.slice(1)}
        </li>
      ));
      feedbackFromTTL = feedback.pip_for_dev_pulse.attributes.map(attribute => (
        <li key={attribute.description}>
          {attribute.description.charAt(0).toUpperCase() +
            attribute.description.slice(1)}
        </li>
      ));
    } else {
      areasOfConcern = feedback.pip_for_lms.attributes.map(attribute => (
        <li key={attribute.attribute}>
          {attribute.attribute.charAt(0).toUpperCase() +
            attribute.attribute.slice(1)}
        </li>
      ));
    }
  } else if (feedback) {
    modalTitle = 'PRE-PIP Feedback';
    modalSubtitle = `${getDayName(feedback.created_at)}, ${getDate(
      feedback.created_at
    )}`;
    areasOfConcern = <li>N/A</li>;
    feedbackFromTTL = <li>{feedback.context}</li>;
  }
  const modalBody = (
    <div className="modal-body">
      <div className="modal-body-title">Areas of concern</div>
      <div className="modal-body-content">
        <ul>{areasOfConcern}</ul>
      </div>
      <div className="modal-body-title">Feedback from TTL</div>
      <div className="modal-body-content">
        <ul>{feedbackFromTTL}</ul>
      </div>
    </div>
  );

  const displayedModal = feedback ? (
    <PopupModal
      modalTitle={modalTitle}
      modalSubtitle={modalSubtitle}
      modalBody={modalBody}
    />
  ) : (
    <PopupModal modalTitle="Loading..." />
  );

  return <div>{displayedModal}</div>;
}

PipFeedbackModal.propTypes = {
  feedback: PropTypes.shape({}).isRequired
};
