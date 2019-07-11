import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { roles, headers } from './helpers';
import cadreProgramIconFill from '../../static/cadreProgramIconFill.svg';
import Table from './Table';
import PMloader from '../CustomLoader/PMLoader';

const cards = role => (
  <div key={role.id} className="card-reports col-sm-3 col-sm-6">
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
  cadreroles,
  loading,
  paginationWrapper,
  searching
}) => {
  const allroles = !cadreroles ? roles : cadreroles;

  return (
    <React.Fragment>
      {loading ? (
        <PMloader />
      ) : (
        <div className="reports-container">
          <div className="container-fluid roles-details overflow-x-auto">
            <div className="row flex-row flex-nowrap justify-content-flex-start">
              {allroles.map(role => cards(role))}
            </div>
          </div>
          <div className="table-content__body">
            <Table
              tableHeaders={headers}
              engineers={engineers}
              handleChange={handleSearchChange}
            />
            <div className="paginator">
              {!engineers || engineers.length === 0 || searching ? (
                ''
              ) : (
                <div className="mb-5">
                  {paginationWrapper.renderPagination()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

ReportSummary.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  engineers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  paginationWrapper: PropTypes.func.isRequired,
  cadreroles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired
};

export default ReportSummary;
