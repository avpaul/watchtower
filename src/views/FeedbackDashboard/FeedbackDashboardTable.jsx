import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Row from '../../components/TableComponents/Row';
import Cell from '../../components/TableComponents/Cell';
import Table from '../../components/TableComponents/Table';
import TableHeader from '../../components/TableComponents/Header';

import renderHeader from './feedbackHeader';
import share from '../../static/share.svg';
import './feedbackDashboard.css';

const formatName = name => {
  const nameForFormat = name.split('@')[0].split('.');
  const formattedName = number =>
    `${nameForFormat[number].charAt(0).toUpperCase()}${nameForFormat[
      number
    ].substr(1)}`;
  return `${formattedName(0)} ${formattedName(1)}`;
};

const formatFeedback = (feedback, index, type) => {
  let formattedFeedback = feedback;
  if (type === 'pre-pip') {
    formattedFeedback = {
      Serial: index + 1,
      Date: feedback.start_date,
      Name: `${feedback.first_name} ${feedback.last_name}`,
      Manager: feedback.manager_email
        ? formatName(feedback.manager_email)
        : 'N/A',
      Feedback: ''
    };
  } else {
    formattedFeedback = {
      Serial: index + 1,
      'Start Date': feedback.start_date,
      'End Date': feedback.endDate || 'N/A',
      Name: `${feedback.first_name} ${feedback.last_name}`,
      Manager: feedback.manager_email
        ? formatName(feedback.manager_email)
        : 'N/A',
      Feedback: ''
    };
  }
  return formattedFeedback;
};

const feedbackRow = (feedback, index, type) => {
  const formattedFeedback = formatFeedback(feedback, index, type);
  return (
    <Row key={index}>
      {Object.keys(formattedFeedback).map(key => {
        const feedbackLink = '#';
        return (
          <Cell key={arrayKey({ key, index })}>
            {key === 'Feedback' ? (
              <a href={feedbackLink} className="feedback-share">
                View <img src={share} alt="share icon" />
              </a>
            ) : (
              formattedFeedback[key]
            )}
          </Cell>
        );
      })}
    </Row>
  );
};

const FeedbackDashboardTable = ({ feedbackArray, currentRole, type }) => {
  const headers = renderHeader(currentRole, type);
  return (
    <Table>
      <TableHeader headers={headers} />

      {feedbackArray.map((feedback, index) =>
        feedbackRow(feedback, index, type)
      )}
    </Table>
  );
};

FeedbackDashboardTable.propTypes = {
  feedbackArray: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape()
      ])
    )
  ).isRequired,
  currentRole: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default FeedbackDashboardTable;
