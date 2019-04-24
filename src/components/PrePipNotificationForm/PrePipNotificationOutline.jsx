import React from 'react';
import PropTypes from 'prop-types';

const PrePipNotificationOutline = ({ fellowFeedback, serialNumber }) => (
  <div className="prepipForm" id="prepipForm">
    <table className="feedbackTable">
      <tr>
        <td>
          <div className="prepipBanner1">
            <img
              className="watch-tower__logo"
              src="/static/media/Logo.355ffce3.svg"
              alt="watch tower logo"
            />{' '}
            WatchTower
          </div>
        </td>
        <td colSpan="6">
          <div className="prepipBanner">Documented Feedback</div>
        </td>
      </tr>
    </table>
    <p className="prepipHtml">
      Dear <b>{fellowFeedback && `${fellowFeedback.name}`},</b>
    </p>
    <p className="prepipHtml">
      The purpose of this email is to notify you that your performance has been
      and is currently not at a satisfactory level. As such, you are required to
      level up on the following skills/areas within the coming weeks:
    </p>

    <table className="tableRing">
      <tr>
        <td>
          <table className="prepipTable">
            <thead className="tableHeader">
              <tr>
                <th>S/N</th>
                <th>
                  Performance Issue Area(s) (Dev Pulse Attribute/LMSOutput)
                </th>
                <th>Rolling Average</th>
                <th>Context</th>
                <th>Areas of Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dashboard-table__row">
                <td>
                  <b>{fellowFeedback && serialNumber}</b>
                </td>
                <td>
                  <b>{fellowFeedback && fellowFeedback.Criteria}</b>
                </td>
                <td>
                  <b>{fellowFeedback && fellowFeedback.Attribute}</b>
                </td>
                <td>
                  <b>{fellowFeedback && fellowFeedback.Context}</b>
                </td>
                <td>
                  <b>{fellowFeedback && fellowFeedback.Recommendation}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>

    <p className="prepipHtml">
      Please note that this is the <b>insert number instance</b> of feedback you
      have received since the performance issue was observed. In
      {/* eslint-disable-next-line */}
      order to meet the Program advancement standard of >=1 on all DevPulse
      attributes, you may need to exceed expectation in these areas within the
      coming weeks.
    </p>
    <p className="prepipHtml">
      We encourage you to reach out to your TTL who is available to give you
      feedback and guidance. You can also seek help from your colleagues or
      cohort rep or any member of the fellow’s council or leadership team as
      needed as you strive to improve on these issue areas.
    </p>
    <p className="prepipHtml">TIA, </p>
    <p>
      <b>
        {fellowFeedback.Manager && `${fellowFeedback.Manager.name}`}, Manager
      </b>
    </p>
  </div>
);

PrePipNotificationOutline.propTypes = {
  serialNumber: PropTypes.number.isRequired,
  fellowFeedback: PropTypes.shape({}).isRequired
};
export default PrePipNotificationOutline;
