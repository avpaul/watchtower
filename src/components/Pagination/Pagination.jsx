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

  renderNormal(
    { currentPage, nextPage, prevPageUrl, totalPages } = this.props
  ) {
    const disableObject = {
      disabled: false,
      disable: true
    };
    const buttonOneEllipsis = currentPage;
    const buttonTwoEllipsis = currentPage + 1;
    const buttonOneAfterEllipse = totalPages - 1;
    const buttonTwoAfterEllipse = totalPages;

    if (currentPage > 1) {
      disableObject.disable = false;
    }
    if (currentPage === totalPages) {
      disableObject.disabled = true;
    }
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
        <div
          className="btn-group mr-2 ml-2"
          role="group"
          aria-label="First group"
        >
          {this.renderPaginationButtons(
            currentPage
              ? 'btn btn-default first active-page'
              : 'btn btn-default first',
            'previous',
            currentPage,
            this.onValueChange,
            buttonOneEllipsis
          )}
          {this.renderPaginationButtons(
            'btn btn-default second',
            'previous',
            currentPage + 1,
            this.onValueChange,
            buttonTwoEllipsis
          )}
          <button type="button" className="btn btn-default second" value="">
            ...
          </button>
          {this.renderPaginationButtons(
            'btn btn-default second',
            'next',
            buttonOneAfterEllipse,
            this.onValueChange,
            buttonOneAfterEllipse
          )}
          {this.renderPaginationButtons(
            'btn btn-default second',
            'next',
            buttonTwoAfterEllipse,
            this.onValueChange,
            buttonTwoAfterEllipse
          )}
        </div>
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

  renderButton = () => {
    const { totalPages } = this.props;
    if (totalPages < 5) {
      return this.renderItems(totalPages);
    }
    return this.renderNormal();
  };

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
  perPage: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  totalPages: 10,
  perPage: '25'
};
