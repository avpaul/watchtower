import React from 'react';
import PropTypes from 'prop-types';
import './FeedbackDuration.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import CalendarInput from '../CalendarInput';
import ActionButton from '../ActionButton';
import handleRawChange from '../../utils/handleInputRawChange';

/**
 * @method FeedbackDuration
 * @description - displays the calendar
 */
const FeedbackDuration = ({
  // feedback props
  handleStartDateChange,
  handleEndDateChange,
  startDate,
  endDate,
  currentDate,
  vacancyType,
  calenderType,
  errors,
  success,
  clearDuration = () => {}
}) => {
  const startDateText =
    vacancyType === 'Role vacancy'
      ? 'Role Start Date'
      : 'Certification Start Date';

  const renderHorizontalCalender = () => (
    <div className="datepicker__grid-container">
      <div className="datepicker__grid-item datepicker__label mb-1">
        {'Application Close Date'}
      </div>
      <div className="datepicker__grid-item datepicker__label mb-1">
        {startDateText}
      </div>
      <div className="datepicker__grid-item">
        <div className="input-group datepicker__input-field mb-2">
          <DatePicker
            popperPlacement="top"
            disabledKeyboardNavigation
            selected={endDate}
            minDate={currentDate}
            onChangeRaw={handleRawChange}
            selectsStart
            popperModifiers={{
              flip: {
                behavior: ['bottom']
              },
              preventOverflow: {
                enabled: false
              },
              hide: {
                enabled: false
              }
            }}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            id="end-date"
          />
          <CalendarInput />
        </div>
      </div>
      <div className="datepicker__grid-item">
        <div className="input-group datepicker__input-field mb-2">
          <DatePicker
            popperPlacement="top"
            disabledKeyboardNavigation
            selected={startDate}
            minDate={currentDate}
            onChangeRaw={handleRawChange}
            selectsStart
            popperModifiers={{
              flip: {
                behavior: ['bottom']
              },
              preventOverflow: {
                enabled: false
              },
              hide: {
                enabled: false
              }
            }}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            id="start-date"
          />
          <CalendarInput />
        </div>
      </div>
      {errors.closeDate && (
        <div
          className={classnames('alert alert-danger mr-3 p-2', {
            'label-input': success
          })}
        >
          {errors.closeDate}
        </div>
      )}
      {errors.startDate && (
        <div
          className={classnames('alert alert-danger mr-3 p-2', {
            'label-input': success
          })}
        >
          {errors.startDate}
        </div>
      )}
    </div>
  );

  const renderVerticalCalender = () => (
    <div className="feedback-calendar-body">
      <div className="feedback-calendar">
        <div className="">
          <p className="feedback-start-date">Start Date</p>
          <div className="input-group fellow-details-input mb-2">
            <DatePicker
              popperPlacement="bottom"
              disabledKeyboardNavigation
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              maxDate={currentDate}
              onChangeRaw={handleRawChange}
              selectsStart
              popperModifiers={{
                flip: {
                  behavior: ['bottom']
                },
                preventOverflow: {
                  enabled: false
                },
                hide: {
                  enabled: false
                }
              }}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
            />
            <CalendarInput />
          </div>
          <p className="feedback-end-date">End Date</p>
          <div className="input-group fellow-details-input mb-2">
            <DatePicker
              popperPlacement="bottom"
              selected={endDate}
              startDate={startDate}
              disabledKeyboardNavigation
              maxDate={currentDate}
              endDate={endDate}
              onChangeRaw={handleRawChange}
              selectsEnd
              popperModifiers={{
                flip: {
                  behavior: ['bottom']
                },
                preventOverflow: {
                  enabled: false
                },
                hide: {
                  enabled: false
                }
              }}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
            />
            <CalendarInput />
          </div>
          <ActionButton clickHandler={clearDuration} text="Clear Duration" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {calenderType === 'horizontal'
        ? renderHorizontalCalender()
        : renderVerticalCalender()}
    </>
  );
};

const datePropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date)
]);

FeedbackDuration.defaultProps = {
  currentDate: () => new Date()
};

FeedbackDuration.propTypes = {
  // feedback proptypes
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  startDate: datePropTypes.isRequired,
  endDate: datePropTypes.isRequired,
  currentDate: datePropTypes,
  vacancyType: PropTypes.string.isRequired,
  calenderType: PropTypes.string.isRequired,
  clearDuration: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  success: PropTypes.bool.isRequired,
  add: PropTypes.shape({}).isRequired,
  edit: PropTypes.shape({}).isRequired
};
export default FeedbackDuration;
