export const splitDate = (date = '2018-10-29 14:34:03') => {
  const splittedDate = date.split(' ');
  return splittedDate[1].substring(0, 5);
};

/**
   * function to compute the current date
   * @function {@param}
   */
export const DateToday = (date) => {
  const notificationDate = new Date(date);
  const today = new Date();
  if (today.toDateString() === notificationDate.toDateString()) {
    return 'Today';
  }
  return null;
};

/**
   * function to compute yesterday's date
   * @function {@param}
   */
export const DateYesterday = (date) => {
  const today = new Date();
  const notificationDate = new Date(date);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (yesterday.toDateString() === notificationDate.toDateString()) {
    return 'Yesterday';
  }
  return null;
};

/**
   * function to get any other date and return it as a month with the day of the month
   * @function {@param}
   */
export const GetMonth = (_date) => { // _date is the date when message was created.
  const date = new Date(_date);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${monthNames[mm - 1]} ${dd}`;
};
export const groupedDate = date => DateToday(date) || DateYesterday(date) || GetMonth(date);
