import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Table from '../TableComponents/Table';
import DashboardRow from './DashboardRow';
import Row from '../TableComponents/Row';
import Cell from '../TableComponents/Cell';
import Error from '../Error';
import Loader from '../Loader/Loader';
import cellAttr from './setAttributes';
import formatHeaderName from './formatHeaderName';
import SortButtons from './SortButtons';

const { ErrorMessage } = Error;

class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'firstName',
      sortType: 'ascending'
    };
  }

  sortFellows = () => {
    const { sortBy: name, sortType } = this.state;
    const { fellows } = this.props;

    return fellows.sort((a, b) => {
      let A = typeof a[name] === 'string' ? a[name].toLowerCase() : a[name];
      let B = typeof b[name] === 'string' ? b[name].toLowerCase() : b[name];

      if (name === 'weeksSpent') {
        A = typeof A === 'string' ? 0 : A;
        B = typeof B === 'string' ? 0 : B;
      }

      if (A < B) return sortType === 'descending' ? 1 : -1;
      if (A > B) return sortType === 'descending' ? -1 : 1;

      return 0;
    });
  };

  fellowCells = fellow => {
    const { cellValues } = this.props;
    return cellValues.map(element => cellAttr(element, fellow));
  };

  arrowClick = event => {
    const name = event.target.getAttribute('data-target');
    const isAscending = event.target.getAttribute('data-ascending');
    this.setState({
      sortBy: name,
      sortType: isAscending ? 'ascending' : 'descending'
    });
  };

  renderTableHeaders = () => {
    const { headers } = this.props;
    const { sortBy, sortType } = this.state;

    return (
      <Row header>
        {headers.map((element, index) => {
          const headerName = formatHeaderName(element);
          const active = headerName.toLowerCase() === sortBy.toLowerCase();
          return (
            <Cell key={arrayKey({ element, index })}>
              <span className="row">
                <span className="pl-2 pt-2">{element}</span>
                <div>
                  <SortButtons
                    arrowUpClick={this.arrowClick}
                    arrowDownClick={this.arrowClick}
                    handleCardClick={this.handleCardClick}
                    headerName={headerName}
                    active={active}
                    sortType={sortType}
                  />
                </div>
              </span>
            </Cell>
          );
        })}
      </Row>
    );
  };

  render() {
    const { fellows, loading } = this.props;
    if (fellows.length < 1 && !loading) {
      return (
        <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
      );
    }

    return (
      <Fragment>
        <Table>
          {this.renderTableHeaders()}
          {this.sortFellows().map(fellow => (
            <DashboardRow
              key={fellow.fellow_id}
              fellow={fellow}
              fellowCells={this.fellowCells(fellow)}
            />
          ))}
        </Table>
        {loading && <Loader />}
      </Fragment>
    );
  }
}

DashboardTable.propTypes = {
  fellows: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  cellValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DashboardTable;
