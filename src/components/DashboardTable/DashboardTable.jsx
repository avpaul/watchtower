import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../TableComponents/Table';
import Cell from '../TableComponents/Cell';
import Row from '../TableComponents/Row';
import DashboardRow from './DashboardRow';
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

  sortFellows = (list, name, sortType) => {
    if (sortType === 'descending') {
      const sortedList = list.sort((a, b) => {
        const A = typeof a[name] === 'string' ? a[name].toLowerCase() : a[name];
        const B = typeof b[name] === 'string' ? b[name].toLowerCase() : b[name];
        if (A < B) return 1;
        if (A > B) return -1;
        return 0;
      });
      return sortedList;
    }
    if (sortType === 'ascending') {
      const sortedList = list.sort((a, b) => {
        const A = typeof a[name] === 'string' ? a[name].toLowerCase() : a[name];
        const B = typeof b[name] === 'string' ? b[name].toLowerCase() : b[name];

        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });
      return sortedList;
    }
    return list;
  };

  fellowCells = fellow => {
    const { cellValues } = this.props;
    return cellValues.map(element => cellAttr(element, fellow));
  };

  arrowUpClick = event => {
    const name = event.target.getAttribute('data-target');
    this.setState({ sortBy: name, sortType: 'descending' });
  };

  arrowDownClick = event => {
    const name = event.target.getAttribute('data-target');
    this.setState({ sortBy: name, sortType: 'ascending' });
  };

  render() {
    const { fellows, loading, headers } = this.props;
    const { sortBy, sortType } = this.state;
    if (fellows.length < 1 && !loading) {
      return (
        <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
      );
    }

    return (
      <Fragment>
        <Table>
          <Row header>
            {headers.map(element => {
              let active = false;
              const headerName = formatHeaderName(element);
              if (headerName.toLowerCase() === sortBy.toLowerCase()) {
                active = true;
              }
              return (
                <Cell>
                  <span className="row">
                    <span className="pl-2 pt-2">{element}</span>
                    <div className="">
                      <SortButtons
                        arrowUpClick={this.arrowUpClick}
                        arrowDownClick={this.arrowDownClick}
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

          {this.sortFellows(fellows, sortBy, sortType).map(fellow => (
            <DashboardRow
              key={fellow.id}
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
