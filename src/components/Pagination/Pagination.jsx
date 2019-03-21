import React, { Component } from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

/**
 * class representing the pagination component
 * @class
 */

class Pagination extends Component {
  /**
   * changes page based on next or previous click
   * @param { object } - event that happens
   */
  onPageChange = event => {
    const { handlePageChange, perPage, filter } = this.props;
    handlePageChange(
      `${event.target.value}&perPage=${perPage}&filter=${filter}`
    );
  };

  /**
   * based on button click
   * @param { object } - event that happens
   */
  onValueChange = event => {
    const { handleValueChange } = this.props;
    handleValueChange(event.target.value);
  };

  renderItems = number => {
    const disabledButton = false;
    const { currentPage } = this.props;
    const elements = [];
    let i = 0;
    while (i < number) {
      elements.push(i + 1);
      i += 1;
    }
    return (
      <div id="form-group col-md-4 row">
        {elements.map(element =>
          this.renderPaginationButtons(
            element === currentPage
              ? 'btn btn-default second active-page'
              : 'btn btn-default second',
            'previous',
            element,
            this.onValueChange,
            element,
            disabledButton
          )
        )}
      </div>
    );
  };

  returnShowing = () => {
    const { currentPage, totalPages } = this.props;
    return (
      <p className="text-center">
        showing {currentPage} of {totalPages} pages
      </p>
    );
  };

  renderNextButtons = (buttonOne, buttonTwo) => (
    <React.Fragment>
      {this.renderPaginationButtons(
        'btn btn-default second',
        'next',
        buttonOne,
        this.onValueChange,
        buttonOne
      )}
      {this.renderPaginationButtons(
        'btn btn-default second',
        'next',
        buttonTwo,
        this.onValueChange,
        buttonTwo
      )}
    </React.Fragment>
  );

  renderPrevButtons = (buttonOne, buttonTwo) => (
    <React.Fragment>
      {this.renderPaginationButtons(
        buttonOne
          ? 'btn btn-default first active-page'
          : 'btn btn-default first',
        'previous',
        buttonOne,
        this.onValueChange,
        buttonOne
      )}
      {this.renderPaginationButtons(
        'btn btn-default second',
        'previous',
        buttonTwo,
        this.onValueChange,
        buttonTwo
      )}
    </React.Fragment>
  );

  renderMiddleButtons = () => {
    const { currentPage, totalPages } = this.props;
    return (
      <React.Fragment>
        <div
          className="btn-group mr-2 ml-2"
          role="group"
          aria-label="First group"
        >
          {this.renderPrevButtons(currentPage, currentPage + 1)}
          <button type="button" className="btn btn-default second" value="">
            ...
          </button>
          {this.renderNextButtons(totalPages - 1, totalPages)}
        </div>
      </React.Fragment>
    );
  };

  renderNormal(
    { currentPage, nextPage, prevPageUrl, totalPages } = this.props
  ) {
    const disableObject = {
      disabled: currentPage === totalPages,
      disable: currentPage > 1
    };

    return (
      <div id="form-group col-md-4 row">
        {this.renderPaginationButtons(
          'btn btn-default first',
          'first',
          prevPageUrl,
          this.onPageChange,
          'Prev',
          disableObject.disable
        )}
        {this.renderMiddleButtons()}
        {this.renderPaginationButtons(
          'btn btn-default first',
          'next',
          nextPage,
          this.onPageChange,
          'Next',
          disableObject.disabled
        )}
      </div>
    );
  }

  renderPaginationButtons = (
    className,
    name,
    value,
    onClick,
    buttonText,
    disableBool = false
  ) => (
    <button
      type="button"
      className={className}
      value={value}
      name={name}
      onClick={onClick}
      disabled={disableBool}
      key={value}
    >
      {buttonText}
    </button>
  );

  renderButtons = () => {
    const { totalPages } = this.props;
    return totalPages < 5 ? this.renderItems(totalPages) : this.renderNormal();
  };

  render() {
    const { perPage, perPageOptions, onPerPageChange, hasFellows } = this.props;
    if (!hasFellows) return <div />;

    return (
      <React.Fragment>
        {this.returnShowing()}
        <div className="row d-flex justify-content-center">
          <div className="per-page">Per page</div>
          <div className="select">
            <select
              className="form-control d-flex justify-content-center"
              value={perPage}
              onChange={onPerPageChange}
            >
              {perPageOptions.map(pages => (
                <option key={pages} value={pages}>
                  {pages}
                </option>
              ))}
            </select>
          </div>
          <div>{this.renderButtons()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
  perPage: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  onPerPageChange: PropTypes.func.isRequired,
  hasFellows: PropTypes.bool
};

Pagination.defaultProps = {
  totalPages: 10,
  perPage: '25',
  perPageOptions: [25, 50, 100],
  hasFellows: false
};
