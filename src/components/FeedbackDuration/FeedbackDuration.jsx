import React from 'react';
import PropTypes from 'prop-types';
import './FeedbackDuration.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  clearDuration,
  currentDate,
  vacancies
}) => {
  const startDateText = vacancies ? 'Certification start date' : 'Start Date';
  const endDateText = 'End Date';
  const closingDateText = 'Application Close Date';
  const bodyStyling = vacancies ? '' : 'feedback-calendar-body';
  const calendarStyling = vacancies ? '' : 'feedback-calendar';

  return (
    <div className={bodyStyling}>
      <div className={calendarStyling}>
        <div className="">
          {vacancies ? (
            <>
              <p className="applications-start-date">{closingDateText}</p>
              <div className="input-group fellow-details-input mb-2">
                <DatePicker
                  popperPlacement="bottom"
                  disabledKeyboardNavigation
                  selected={endDate}
                  startDate={startDate}
                  endDate={endDate}
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
                  id="start-date"
                />
                <CalendarInput />
                <input type="text" id="start-date" className="label-input" />
              </div>
            </>
          ) : (
            <>
              <p className="feedback-start-date">{startDateText}</p>
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
                  id="start-date"
                />
                <CalendarInput />
                <input type="text" id="start-date" className="label-input" />
              </div>
            </>
          )}
          {vacancies ? (
            <>
              <p className="applications-start-date">{startDateText}</p>
              <div className="input-group fellow-details-input mb-2">
                <DatePicker
                  popperPlacement="bottom"
                  disabledKeyboardNavigation
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={endDate}
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
                <input type="text" id="start-date" className="label-input" />
              </div>
            </>
          ) : (
            <>
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
                  id="end-date"
                />
                <CalendarInput />
                <input type="text" id="end-date" className="label-input" />
              </div>
            </>
          )}
          {vacancies ? (
            ''
          ) : (
            <ActionButton clickHandler={clearDuration} text="Clear Duration" />
          )}
        </div>
      </div>
    </div>
  );
};

const datePropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date)
]);

FeedbackDuration.defaultProps = {
  vacancies: false,
  currentDate: () => new Date()
};

FeedbackDuration.propTypes = {
  // feedback proptypes
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  startDate: datePropTypes.isRequired,
  endDate: datePropTypes.isRequired,
  clearDuration: PropTypes.func.isRequired,
  currentDate: datePropTypes,
  vacancies: PropTypes.bool
};
export default FeedbackDuration;
