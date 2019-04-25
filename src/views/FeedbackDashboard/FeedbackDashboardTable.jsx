import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import { Link } from 'react-router-dom';
import Row from '../../components/TableComponents/Row';
import Cell from '../../components/TableComponents/Cell';
import Table from '../../components/TableComponents/Table';
import TableHeader from '../../components/TableComponents/Header';
import renderHeader from './feedbackHeader';
import share from '../../static/share.svg';
import './feedbackDashboard.css';
import { formatName } from '../../services/helper';

const formatFeedback = (feedback, index, type) => {
  let formattedFeedback = feedback;
  if (type === 'pre-pip') {
    formattedFeedback = {
      Serial: index + 1,
      Date: feedback.start_date,
      Name: `${feedback.name}`,
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
      Name: `${feedback.name}`,
      Manager: feedback.manager_email
        ? formatName(feedback.manager_email)
        : 'N/A',
      Feedback: ''
    };
  }
  return formattedFeedback;
};

const ViewPrePip = (feedback, handleClick, index) => {
  const feedbackLink = `/feedback/${feedback.name.split(' ').join('.')}`;
  return (
    <Link
      to={{
        pathname: feedbackLink,
        dataKey: index
      }}
      onClick={handleClick}
      data-key={index}
      className="feedback-share"
    >
      View <img src={share} alt="share icon" />
    </Link>
  );
};

const feedbackRow = (feedback, index, type, handleClick) => {
  const formattedFeedback = formatFeedback(feedback, index, type);
  return (
    <Row key={index}>
      {Object.keys(formattedFeedback).map(key => (
        <Cell key={arrayKey({ key, index })}>
          {key === 'Feedback'
            ? ViewPrePip(feedback, handleClick, index)
            : formattedFeedback[key]}
        </Cell>
      ))}
    </Row>
  );
};

const FeedbackDashboardTable = ({
  feedbackArray,
  currentRole,
  type,
  handleClick
}) => {
  const headers = renderHeader(currentRole, type);
  return (
    <Table>
      <TableHeader headers={headers} />

      {feedbackArray.map((feedback, index) =>
        feedbackRow(feedback, index, type, handleClick)
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
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.shape.isRequired
};

export default FeedbackDashboardTable;
