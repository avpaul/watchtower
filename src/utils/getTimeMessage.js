const morningStart = 6.00;
const morningStop = 11.59;
const lunchStart = 12.00;
const lunchStop = 15.59;
const yourTimeStart = 16.00;
const yourTimeStop = 20.59;
const eveningStart = 21.00;
const eveningStop = 23.00;
const sleepStart = 0;
const sleepStop = 5.59;

const goodMorningMessage = username => `Good Morning, ${username}! 🌞`;
const lunchTimeMessage = username => `Hey ${username}, it's munch time! 🤤`;
const backToWorkTimeMessage = username =>
  `Hey ${username}, you're doing great! 👍`;
const chillTime = username => `Hey ${username}, time to take a chill! 🌚`;
const sleepTimeMessage = username => `Hey ${username}, isn't it snooze time 💤`;

const getTimeMessage = (currentHour, username) => {
  let message;
  if (morningStart <= currentHour && currentHour <= morningStop) {
    message = goodMorningMessage(username);
  }
  if (lunchStart <= currentHour && currentHour <= lunchStop) {
    message = lunchTimeMessage(username);
  }
  if (yourTimeStart <= currentHour && currentHour <= yourTimeStop) {
    message = backToWorkTimeMessage(username);
  }
  if (eveningStart <= currentHour && currentHour <= eveningStop) {
    message = chillTime(username);
  }
  if (sleepStart <= currentHour && currentHour <= sleepStop) {
    message = sleepTimeMessage(username);
  }
  return message;
};

export default getTimeMessage;
