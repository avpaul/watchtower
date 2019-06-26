import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'antd/lib/pagination';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { roles, headers, countRoles } from './helpers';
import cadreProgramIconFill from '../../static/cadreProgramIconFill.svg';
import Table from './Table';

const cards = (role, engineers) => (
  <div key={role.id} className="col-md-3 col-sm-6">
    <div className="card-tile">
      <div className="card-tile-heading">
        <img src={cadreProgramIconFill} alt="..." />
      </div>
      <div className="card-tile-content card-tile-body">
        <div className="card-tile-description text-title"> {role.title}</div>
        <div className="card-tile-number text-title ">
          {countRoles(engineers, role.role).length}
        </div>
        <Link className="card-tile-footer" to="/cadre/vacancies">
          <small>
            {role.slotsAvailable} slots available
            <i className="fa fa-chevron-circle-right more-info" />
          </small>
        </Link>
      </div>
    </div>
  </div>
);

const ReportSummary = ({
  engineers,
  handleSearchChange,
  handleShowSizeChange,
  handlePageChange,
  pageSizeOptions,
  total
}) => (
  <React.Fragment>
    <div className="reports-container">
      <div className="row">{roles.map(role => cards(role, engineers))}</div>
      <Table
        tableHeaders={headers}
        engineers={engineers}
        handleChange={handleSearchChange}
      />
      <div className="paginator">
        <Pagination
          showSizeChanger
          showQuickJumper
          defaultCurrent={1}
          defaultPageSize={20}
          pageSizeOptions={pageSizeOptions}
          onShowSizeChange={handleShowSizeChange}
          onChange={handlePageChange}
          total={total}
        />
      </div>
    </div>
  </React.Fragment>
);

ReportSummary.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  engineers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleShowSizeChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number
};

ReportSummary.defaultProps = {
  total: 50
};

export default ReportSummary;
