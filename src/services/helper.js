import _ from 'underscore';

export const splitDate = (date = '2018-10-29 14:34:03') => {
  const splittedDate = date.split(' ');
  return splittedDate[1].substring(0, 5);
};

/**
 * function to get date and return in format "29/10/2018"
 * @function {@param}
 */
export const getDate = (date = '2018-10-29 14:34:03') => {
  const fullDate = date.split(' ', 1);
  const splittedDate = fullDate[0].split('-');
  const year = splittedDate[0];
  const month = splittedDate[1];
  const day = splittedDate[2];
  const newDate = `${day}/${month}/${year}`;
  return newDate;
};

/**
 * function to compute the current date
 * @function {@param}
 */
export const DateToday = date => {
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
export const DateYesterday = date => {
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
export const GetMonth = _date => {
  // _date is the date when message was created.
  const date = new Date(_date);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${monthNames[mm - 1]} ${dd}`;
};

/**
 * function to get any other date and return the day of the week in words
 * @function {@param}
 */
export const getDayName = (dateString = '2018-10-29 14:34:03') => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const date = new Date(dateString);
  const dayName = days[date.getDay()];
  return dayName;
};

export const calcNoOfWeeks = (start = 0, end = 0) => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const noOfWeeks = Math.floor((date2 - date1) / (1000 * 24 * 60 * 60 * 7));
  return _.range(1, noOfWeeks + 1);
};

export const getCurrentWeek = start => {
  const date1 = new Date(start);
  const date2 = new Date();

  // The denominator is the equivalent of a day in milliseconds
  return Math.floor((date2 - date1) / (1000 * 24 * 60 * 60 * 7));
};

export const groupedDate = date =>
  DateToday(date) || DateYesterday(date) || GetMonth(date);

export const formatName = name => {
  const nameForFormat = `${name}`.split('@')[0].split('.');
  const formattedName = number =>
    `${`${nameForFormat[number]}`.charAt(0).toUpperCase()}${`${
      nameForFormat[number]
    }`.substr(1)}`;
  return `${formattedName(0)} ${formattedName(1)}`;
};

export const convertToEmail = name =>
  `${`${name}`
    .split(' ')
    .join('.')
    .toLowerCase()}@andela.com`;
/**
 * this method processes count on an array with counts and converts it to an object
 * @param {*} informationArray an array of objects with counts
 * @param {*} emptyObject the initial empty object to be passed in
 * @param {*} filterKey the key to count
 */
export const processCountInformation = (
  informationArray,
  emptyObject,
  filterKey
) => {
  let processedCountInformation = emptyObject;
  const imageInformation = {};

  if (filterKey === 'level')
    processedCountInformation = {
      'D0A Simulations': 0,
      'D0B Apprenticeship': 0
    };
  if (filterKey === 'type')
    processedCountInformation = { 'pre-pip': 0, pip: 0 };
  if (filterKey === 'criteria')
    processedCountInformation = { pulse: 0, lms: 0 };
  informationArray.forEach(information => {
    const determineDisplay =
      filterKey === 'manager_email'
        ? formatName(information[filterKey])
        : information[filterKey];
    if (!processedCountInformation[determineDisplay]) {
      processedCountInformation[determineDisplay] = 1;
    } else {
      processedCountInformation[determineDisplay] += 1;
    }

    if (!imageInformation[determineDisplay] && filterKey === 'manager_email')
      imageInformation[determineDisplay] = informationArray.picture;
  });

  return { processedCountInformation, imageInformation };
};

export const processArray = (informationArray, objectWithCounts) => {
  let refinedArray = informationArray;
  refinedArray = [
    ...refinedArray,
    ...Array.from(Object.keys(objectWithCounts), product => ({
      [product]: objectWithCounts[product]
    }))
  ];
  return refinedArray;
};

/**
 * function to return a number to 2 decimal places
 * @function {@param}
 */
export const truncateNumber = number => Math.round(number * 100) / 100;
/**
 * function to return an array of indexes for an element in an array or string
 * @function {@param}
 */
export const getAllIndexesOfElement = (arr, val) => {
  const indexes = [];
  let i;
  for (i = 0; i < arr.length; i += 1) if (arr[i] === val) indexes.push(i);
  return indexes;
};
/**
 * function to format texts into two paragraphs
 * @function {@param}
 */
export const formatText = text => {
  if (text) {
    const periods =
      text.match(/\./g, ' ') !== null ? text.match(/\./g, ' ').length : 1;
    const divisor = Math.round(periods / 2);
    const textindexes = getAllIndexesOfElement(text, '.');
    const paragraph1 = text.slice(0, textindexes[divisor - 1] + 1);
    let paragraph2 = text.slice(textindexes[divisor - 1]);
    paragraph2 = paragraph2.substring(1).trim();
    return { paragraph1, paragraph2 };
  }
  return false;
};
