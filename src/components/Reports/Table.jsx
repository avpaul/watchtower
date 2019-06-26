import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './reports.css';

/**
 * Display user user name and picture in the cadre program
 * @param  {object} item
 * @return The table column for user name and picture
 */
export const username = (item, initials) => (
  <td data-th="">
    <div className="row username-row">
      <div className="col-sm-2 image-column">
        {!item.picture ? (
          <div className="profilePlaceHolder">{initials}</div>
        ) : (
          <img src={item.picture} alt="..." className="img-responsive" />
        )}
      </div>
      <div className="col-sm-10 name-column">
        {`${item.first_name} ${item.last_name}`}
      </div>
      <div className="col-sm-10 initials">{initials}</div>
    </div>
  </td>
);

/**
 * Display user status in the cadre program
 * @param  {object} item
 * @return The table column for status
 */
export const status = item => (
  <td data-th="">
    <div className="status-color">
      {item.account_active ? (
        <small>
          <span className="color is-active" />
          Active
        </small>
      ) : (
        <small>
          <span className="color inactive" />
          Inactive
        </small>
      )}
    </div>
  </td>
);

/**
 * Display table row that has user details in the cadre program
 * @param  {object} item
 * @return Each table row
 */
export const tableRow = (item, initials) => (
  <tr key={item.id} className="table-row">
    {username(item, initials)}
    <td data-th=" Price">{item.email}</td>
    <td className="">{!item.role ? '-' : item.role}</td>
    <td className="">{!item.project ? '-' : item.project}</td>
    {status(item)}
    <td className="">{!item.cohort ? '-' : item.cohort}</td>
    <td className="text-center">
      {`${moment(item.apprenticeship_end_date).format('LL')}`}
    </td>
    <td className="text-center">
      {!item.cadre_start_date
        ? '-'
        : `${moment(item.cadre_start_date).format('LL')}`}
    </td>
  </tr>
);

export const panel = handleChange => (
  <div className="row">
    <div className="col col-xs-6 search-panel">
      <div className="searchbar">
        <input
          className="search_input"
          type="text"
          name=""
          placeholder="Search..."
          onChange={handleChange}
        />
        <Link to="!#" className="search_icon">
          <i className="fas fa-search" />
        </Link>
      </div>
    </div>
    <div className="col sort-btn col-xs-6 text-right">
      <button type="button" className="btn export-btn btn-sm btn-default">
        Export
      </button>
      <button type="button" className="btn filter-btn btn-sm btn-default">
        Filter By
        <i className="fas fa-chevron-down filter-chevron" />
      </button>
    </div>
  </div>
);

const Table = ({ tableHeaders, handleChange, engineers }) => (
  <React.Fragment>
    <div className="panel">
      <div className="panel-heading">
        {panel(handleChange)}
        <br />
      </div>
    </div>
    <div className="table-overflow">
      <table className="stats-table">
        <tr>
          {tableHeaders.map(title => (
            <th key={title} className=" header-title">
              {title}
            </th>
          ))}
        </tr>
        <tbody>
          {engineers.map(item =>
            tableRow(
              item,
              `${item.first_name.charAt(0)}${item.last_name.charAt(0)}`
            )
          )}
        </tbody>
      </table>
    </div>
  </React.Fragment>
);

Table.propTypes = {
  handleChange: PropTypes.func.isRequired,
  engineers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Table;
