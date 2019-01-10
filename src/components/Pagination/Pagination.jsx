import React, { Component } from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

/**
 * class representing the pagination component
 * @class
 */

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      disable: true,
      disabledButton: false,
      count: 1
    };
  }

  /**
   * changes page based on next or previous click
   * @param { object } - event that happens
   */
  onPageChange = event => {
    let { count } = this.state;
    const { handlePageChange, perPage, totalPages, filter } = this.props;
    const buttonName = event.target.name;
    if (buttonName === 'next') {
      count += 1;
    } else if (buttonName === 'first') {
      count -= 1;
    }
    handlePageChange(
      `${event.target.value}&perPage=${perPage}&filter=${filter}`
    );
    this.setState({ count });
    if (count > 1) {
      this.setState({ disable: false });
    }
    if (count === totalPages) {
      this.setState({ disabled: true });
    }
    if (count <= 1) {
      this.setState({ disable: true, disabled: false });
    }
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
    const { disabledButton } = this.state;
    const elements = [];
    let i = 0;
    while (i < number) {
      elements.push(i + 1);
      i += 1;
    }
    return (
      <div id="form-group col-md-4 row">
        {elements.map(e =>
          this.renderPaginationButtons(
            'btn btn-default second',
            'previous',
            e,
            this.onValueChange,
            e,
            disabledButton
          )
        )}
      </div>
    );
  };

  renderNormal(
    { currentPage, nextPage, prevPageUrl, totalPages } = this.props
  ) {
    const { disabled, disable } = this.state;
    const buttonOneEllipsis = currentPage;
    const buttonTwoEllipsis = currentPage + 1;
    const buttonOneAfterEllipse = totalPages - 1;
    const buttonTwoAfterEllipse = totalPages;
    return (
      <div id="form-group col-md-4 row">
        {this.renderPaginationButtons(
          'btn btn-default first',
          'first',
          prevPageUrl,
          this.onPageChange,
          'Prev',
          disable
        )}
        <div
          className="btn-group mr-2 ml-2"
          role="group"
          aria-label="First group"
        >
          {this.renderPaginationButtons(
            'btn btn-default first',
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
          disabled
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
  filter: PropTypes.string.isRequired
};

Pagination.defaultProps = {
  totalPages: 10,
  perPage: '10'
};
