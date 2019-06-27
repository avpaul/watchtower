import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'antd/lib/pagination';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { roles, headers } from './helpers';
import cadreProgramIconFill from '../../static/cadreProgramIconFill.svg';
import Table from './Table';

const cards = role => (
  <div key={role.id} className="col-md-3 col-sm-6">
    <div className="card-tile">
      <div className="card-tile-heading">
        <img src={cadreProgramIconFill} alt="..." />
      </div>
      <div className="card-tile-content card-tile-body">
        <div className="card-tile-description text-title"> {role.name}</div>
        <div className="card-tile-number text-title ">
          {role.active_engineers_count}
        </div>
        <Link className="card-tile-footer" to="/cadre/vacancies">
          <small>
            {role.vacancies_count} slots available
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
  total,
  cadreroles
}) => {
  const allroles = !cadreroles ? roles : cadreroles;

  return (
    <React.Fragment>
      <div className="reports-container">
        <div className="row">{allroles.map(role => cards(role))}</div>
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
};

ReportSummary.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  engineers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleShowSizeChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number,
  cadreroles: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

ReportSummary.defaultProps = {
  total: 50
};

export default ReportSummary;
