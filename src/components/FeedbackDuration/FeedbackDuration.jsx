import React from 'react';
import PropTypes from 'prop-types';
import './FeedbackDuration.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarInput from '../CalendarInput';
import ActionButton from '../ActionButton';

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
  clearDuration,
  currentDate
}) => {
  const startDateText = 'Start Date';
  const endDateText = 'End Date';

  return (
    <div className="feedback-calendar-body">
      <div className="feedback-calendar">
        <div className="">
          <p className="feedback-start-date">{startDateText}</p>
          <div className="input-group fellow-details-input mb-2">
            <DatePicker
              popperPlacement="bottom"
              disabledKeyboardNavigation
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              maxDate={currentDate}
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
            <input type="text" id="start-date" className="label-input" />
          </div>
          <p className="feedback-end-date">{endDateText}</p>
          <div className="input-group fellow-details-input mb-2">
            <DatePicker
              popperPlacement="bottom"
              selected={endDate}
              startDate={startDate}
              disabledKeyboardNavigation
              maxDate={currentDate}
              endDate={endDate}
              minDate={startDate}
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
              id="end-date"
            />
            <CalendarInput />
            <input type="text" id="end-date" className="label-input" />
          </div>
          <ActionButton clickHandler={clearDuration} text="Clear Duration" />
        </div>
      </div>
    </div>
  );
};

const datePropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date)
]);

FeedbackDuration.propTypes = {
  // feedback proptypes
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  startDate: datePropTypes.isRequired,
  endDate: datePropTypes.isRequired,
  clearDuration: PropTypes.func.isRequired,
  currentDate: datePropTypes.isRequired
};
export default FeedbackDuration;
