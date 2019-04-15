import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Table from '../TableComponents/Table';
import DashboardRow from './DashboardRow';
import Row from '../TableComponents/Row';
import Cell from '../TableComponents/Cell';
import Error from '../Error';
import Loader from '../Loader/Loader';
import { setColor } from '../../utils';
import getColumnAttribute from './Helpers';
import SortButtons from './SortButtons';
import { integerFields } from '../../views/DashboardPage/filterValues';

const { ErrorMessage } = Error;

class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name',
      sortType: 'ascending',
      isInitiallySorted: false
    };
  }

  componentDidUpdate() {
    const { fellows, handleSortingChange } = this.props;
    const { isInitiallySorted } = this.state;

    if (fellows.length !== 0 && !isInitiallySorted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        { isInitiallySorted: true },
        handleSortingChange(this.sortFellows())
      );
    }
  }

  sortFellows = () => {
    const { sortBy: name, sortType } = this.state;
    const { fellows } = this.props;
    return fellows.sort((a, b) => {
      let A = a[name] || 'n/a';
      let B = b[name] || 'n/a';

      A = typeof A === 'string' ? A.toLowerCase() : A;
      B = typeof B === 'string' ? B.toLowerCase() : B;

      if (integerFields.includes(name)) {
        A = A === 'n/a' ? -5 : A;
        B = B === 'n/a' ? -5 : B;
      }

      if (A < B) return sortType === 'descending' ? 1 : -1;
      if (A > B) return sortType === 'descending' ? -1 : 1;

      return 0;
    });
  };

  fellowCells = fellow => {
    const { cellValues } = this.props;
    return cellValues.map(element => ({
      element,
      value: fellow[element] || 'N/A',
      color: fellow[element] ? setColor(fellow[element]) : 'no-track'
    }));
  };

  arrowClick = event => {
    const { handleSortingChange } = this.props;
    const sortingParams = {
      sortBy: event.target.getAttribute('data-target'),
      sortType: event.target.getAttribute('data-ascending')
        ? 'ascending'
        : 'descending'
    };

    this.setState(sortingParams, () => handleSortingChange(this.sortFellows()));
  };

  renderTableHeaders = () => {
    const { headers } = this.props;
    const { sortBy, sortType } = this.state;

    return (
      <Row header>
        {headers.map((element, index) => {
          const headerName = getColumnAttribute(element);
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
    const { fellowsToDisplay, loading } = this.props;
    if (fellowsToDisplay.length < 1 && !loading) {
      return (
        <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
      );
    }

    return (
      <Fragment>
        <Table>
          {this.renderTableHeaders()}
          {fellowsToDisplay.map(fellow => (
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
  fellowsToDisplay: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSortingChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  cellValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DashboardTable;
