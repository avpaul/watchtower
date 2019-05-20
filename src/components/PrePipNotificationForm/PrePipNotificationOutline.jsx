import React from 'react';
import PropTypes from 'prop-types';
import getFeedbackIndex from '../../utils/formatFeedbackInstance';
import LogoSection from '../Header/LogoSection';

export const managerName = data => {
  if (data.Manager === 'null') {
    return null;
  }
  if (typeof data.Manager === 'string') {
    return `${JSON.parse(data.Manager).name}, Manager`;
  }
  return `${data.Manager.name}, Manager`;
};

const PrePipNotificationOutline = ({ fellowFeedback, serialNumber }) => (
  <div className="prepipForm" id="prepipForm">
    <table className="feedbackTable">
      <tr>
        <td>
          <div className="prepipBanner1">
            <LogoSection />
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
                  <b className="text-capitalize">
                    {fellowFeedback && fellowFeedback.Criteria}
                  </b>
                </td>
                <td>
                  <b>{fellowFeedback && fellowFeedback.Rating}</b>
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
      Please note that this is the{' '}
      {fellowFeedback &&
        `${getFeedbackIndex(
          fellowFeedback.Instances,
          fellowFeedback.startDate
        )} `}
      feedback you have received since the performance issue was observed. In
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
      <b>{managerName(fellowFeedback)}</b>
    </p>
  </div>
);

PrePipNotificationOutline.propTypes = {
  serialNumber: PropTypes.number.isRequired,
  fellowFeedback: PropTypes.shape({}).isRequired
};
export default PrePipNotificationOutline;
