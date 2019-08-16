export const formatDate = date => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

// Using the formatDate utils format for alternate format dd/MM/YYY
export const altDate = date =>
  formatDate(date)
    .split('-')
    .reverse()
    .join('/');

const calculateEndDate = (certificationDuration, startDate) => {
  const finalDate = new Date(Number(startDate));
  finalDate.setDate(startDate.getDate() + certificationDuration);
  return formatDate(finalDate.toDateString());
};

export default calculateEndDate;
