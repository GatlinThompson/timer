const setStartingTime = () => {
  const d = new Date();
  let day = d.getDay();
  if (day == 4) d.setHours(17, 0, 0);
  else if (day < 5) d.setHours(18, 0, 0);
  else d.setHours(8, 0, 0);
  const date = {
    date: d,
    day: d.getDay(),
    minute: d.getMinutes(),
    hour: d.getHours(),
    seconds: d.getSeconds(),
  };

  return date;
};

const setEndTime = (date) => {
  let d = new Date(date.date.getTime());
  if (date.day < 5) d.setHours(20, 0, 0);
  else d.setHours(13, 0, 0);

  const endTime = {
    date: d,
    day: d.getDay(),
    minute: d.getMinutes(),
    hour: d.getHours(),
    seconds: d.getSeconds(),
  };

  return endTime;
};

const getTotalSeconds = (time) => {
  let hours = time.getHours() * 60 * 60;
  let minutes = time.getMinutes() * 60;

  return minutes + hours + time.getSeconds();
};

const timeLeft = (time) => {
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  const timer = `${hours}:${displayMinutes}:${displaySeconds}`;

  return timer;
};

const getRemainingTime = (startTime, endTime, currentTime) => {
  let start = getTotalSeconds(startTime.date);

  let end = getTotalSeconds(endTime.date);

  let current = getTotalSeconds(currentTime);

  const remainingTime = end - current;
  const timer = timeLeft(remainingTime);

  let r = current - start;
  let e = end - start;
  const remaining = (((e - r) / e) * 100).toFixed(1);

  const remainer = {
    percent: remaining,
    timeLeft: timer,
  };

  return remainer;
};

export const timer = () => {
  const startDate = setStartingTime();
  const finishDate = setEndTime(startDate);

  setInterval(() => {
    const d = new Date();
    const remaining = getRemainingTime(startDate, finishDate, d);
    if (remaining.percent > 0)
      document.title = `${remaining.timeLeft} (${remaining.percent}%)`;
    else document.title = `You can go home now.`;
  }, 1000);
};
