import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import './Pagination.scss';
import PaginationButton from './PaginationButton';

/**
 * class representing the pagination component
 * @class
 */

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perPage: props.perPage,
      page: props.currentPage
    };
  }

  componentDidUpdate(prevProps) {
    const { perPage, currentPage } = this.props;
    if (prevProps.perPage !== perPage) this.updatePerPage(perPage);
    if (prevProps.currentPage !== currentPage)
      this.updateCurrentPage(currentPage);
  }

  updatePerPage = perPage => this.setState({ perPage });

  updateCurrentPage = page => this.setState({ page });

  /**
   * changes page based on next or previous click
   * @param { object } - event that happens
   */
  onPageChange = event => {
    const { handlePageChange, totalPages } = this.props;
    let { page } = this.state;
    const { perPage } = this.state;

    const action = event.target.name;
    switch (action) {
      case 'previous':
        page = page === 1 ? page : (page -= 1);
        break;
      case 'next':
        page = page === totalPages ? page : (page += 1);
        break;
      default:
        break;
    }

    this.setState({ page }, () => {
      handlePageChange({
        pageAction: action,
        perPage,
        page
      });
    });
  };

  /**
   * based on button click
   * @param { object } - event that happens
   */
  onValueChange = event => {
    const { handleValueChange, filter } = this.props;
    const { perPage } = this.state;

    const page = parseInt(event.target.value, 10);

    this.setState({ page });
    handleValueChange({
      page,
      perPage,
      filter
    });
  };

  /**
   ** Handles the change of page size setting
   * @param event Event object generated by button click
   */
  onPerPageChange = event => {
    const { filter, handleValueChange } = this.props;
    const newState = parseInt(event.target.value, 10);

    this.setState({ perPage: newState, page: 1 }, () => {
      handleValueChange({ filter, ...this.state });
    });
  };

  /**
   ** Renders the numbered buttons to allow for changing of page according to page number
   * @param number The total number of buttons to output as page number buttons
   */
  renderNumericButtons = number => {
    const disabledButton = false;
    const { page } = this.state;

    if (number === 0) return <div />;

    const elements = Array.from(
      new Array(number),
      (element, index) => index + 1
    );

    return elements.map(element => (
      <PaginationButton
        className={`btn btn-default pg__button${
          element === page ? '--active' : ''
          }`}
        name="previous"
        value={element}
        onClick={this.onValueChange}
        key={element}
        buttonText={`${element}`}
        disabledButton={disabledButton}
      />
    ));
  };

  renderMiddleButtons = (buttons, activePage) =>
    buttons.map((button, index) => (
      <React.Fragment key={arrayKey({ button, index })}>
        <PaginationButton
          className={`btn btn-default pg__button${
            activePage === button.value ? '--active' : ''
            }`}
          name={index > 2 ? 'next' : 'previous'}
          value={button.value}
          onClick={
            typeof button.value === 'number'
              ? this.onValueChange
              : this.onPageChange
          }
          buttonText={`${button.value}`}
          disabledButton={button.disable}
        />
        {index === 2 ? (
          <button type="button" className="btn btn-default pg__button" value="">
            ...
          </button>
        ) : null}
      </React.Fragment>
    ));

  renderNormal = ({ totalPages } = this.props) => {
    const { page: currentPage } = this.state;
    const lowerBound = currentPage + 2 > totalPages ? 1 : currentPage;

    return this.renderMiddleButtons(
      [
        { value: 'Prev', disable: currentPage === totalPages },
        { value: lowerBound },
        { value: lowerBound + 1 },
        { value: totalPages - 1 },
        { value: totalPages },
        { value: 'Next', disable: currentPage <= 1 }
      ],
      currentPage
    );
  };

  renderShowing = () => {
    const { totalPages, currentPage } = this.props;
    return (
      <p className="pg__showing text-center">
        Showing {currentPage} of {totalPages} pages
      </p>
    );
  };

  renderPerPageOptions = () => {
    const { perPage } = this.state;
    const { perPageOptions } = this.props;

    return (
      <select
        className="form-control"
        value={perPage}
        onChange={this.onPerPageChange}
      >
        {perPageOptions.map(pages => (
          <option value={pages} key={pages}>
            {pages}
          </option>
        ))}
      </select>
    );
  };

  renderPagination = (isFewPages, totalPages) => (
    <>
      {this.renderShowing()}
      <div className="pg__per-page">
        <div className="pg__per-page__select">
          {this.renderPerPageOptions()}
        </div>
        <div className="pg__per-page__label">Per page</div>
      </div>
      <div className={`pg__buttons${isFewPages ? '' : '--multiple'}`}>
        <div className="pg__buttons__list">
          {isFewPages
            ? this.renderNumericButtons(totalPages)
            : this.renderNormal()}
        </div>
      </div>
    </>
  );

  render() {
    const { hasData, totalPages } = this.props;
    if (!hasData) return <div />;

    return (
      <div className="pg__wrapper">
        <div className="pg">{this.renderPagination(totalPages < 5, totalPages)}</div>
      </div>
    );
  }
}

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  perPageOptions: PropTypes.instanceOf(Array),
  handleValueChange: PropTypes.func.isRequired,
  filter: PropTypes.shape().isRequired,
  currentPage: PropTypes.number.isRequired,
  hasData: PropTypes.bool
};

Pagination.defaultProps = {
  totalPages: 10,
  perPage: 25,
  perPageOptions: [10, 20, 25, 30, 50, 100],
  hasData: false
};
