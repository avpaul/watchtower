import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const ProjectEngineerRow = ({ engineer, engineerCells }) => (
  <Row key={engineer.id}>
    {engineerCells.map(detail => (
      <Cell
        addedClass=""
        title={`${engineer.product} engineers`}
        key={arrayKey({ detail })}
      >
        {detail}
      </Cell>
    ))}
  </Row>
);

ProjectEngineerRow.propTypes = {
  engineer: PropTypes.shape({}).isRequired,
  engineerCells: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ProjectEngineerRow;
