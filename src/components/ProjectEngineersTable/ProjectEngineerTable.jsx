import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Table from '../TableComponents/Table';
import TableHeader from '../TableComponents/Header';
import Error from '../Error';
import { getDate } from '../../services/helper';
import ProjectEngineerRow from './ProjectEngineerRow/ProjectEngineerRow';

const engineerCells = engineer => [
  <div>
    <img src={engineer.picture} alt="engineer" />
    <span>
      {engineer.first_name} {engineer.last_name}
    </span>
  </div>,
  engineer.project_role_name,
  engineer.cohort,
  getDate(engineer.apprenticeship_end_date),
  getDate(engineer.apprenticeship_start_date)
];

const ProjectEngineerTable = props => {
  const { engineers } = props;
  const { ErrorMessage } = Error;
  if (!!engineers && engineers.length < 1) {
    return (
      <ErrorMessage message="There are currently no Engineers on this project" />
    );
  }
  const headers = ['Engineer', 'Role', 'Cohort', 'Appr.End Date', 'Start Date'];
  return (
    <Fragment>
      <Table>
        <TableHeader headers={headers} />
        {!!engineers &&
          engineers.map(engineer => (
            <ProjectEngineerRow
              key={arrayKey(engineer)}
              engineer={engineer}
              engineerCells={engineerCells(engineer)}
            />
          ))}
      </Table>
    </Fragment>
  );
};

ProjectEngineerTable.defaultProps = {
  engineer: {}
};

ProjectEngineerTable.propTypes = {
  engineers: PropTypes.arrayOf(PropTypes.object).isRequired,
  engineer: PropTypes.shape({})
};

export default ProjectEngineerTable;
