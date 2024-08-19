const setStartTime = () => {
  const d = new Date();
  const day = d.getDay();
  if (day == 4) d.setHours(17, 0, 0);
  else if (day < 5) d.setHours(18, 0, 0);
  else d.setHours(8, 0, 0);

  // return time
  const time = {
    date: d,
    day: d.getDay(),
    minute: d.getMinutes(),
    hour: d.getHours(),
    seconds: d.getSeconds(),
  };

  return time;
};

const setEndTime = (date) => {
  let d = new Date(date.date.getTime()); // copy date
  //set end time
  if (date.day < 5) d.setHours(20, 0, 0); // 20
  else d.setHours(12, 0, 0);

  //return time
  const time = {
    date: d,
    day: d.getDay(),
    minute: d.getMinutes(),
    hour: d.getHours(),
    seconds: d.getSeconds(),
  };

  return time;
};

const getTotalSeconds = (time) => {
  let hours = time.getHours() * 60 * 60;
  let minutes = time.getMinutes() * 60;

  return minutes + hours + time.getSeconds();
};

const timeLeft = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  print(minutes);
  let seconds = time % 60;
  let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  const timer = `${hours}:${displayMinutes}:${displaySeconds}`;

  const data = {
    timer: timer,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  return data;
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

  const remainder = {
    percent: remaining,
    time: timer,
  };

  return remainder;
};

const changeNumbers = (seconds, id) => {
  // get moving parts
  const block = document.querySelector(id);
  const top_mover = block.querySelector(".top-mover");
  const btm_block = block.querySelector(".number-bottom-section");
  top_mover.classList.add("change");
  btm_block.classList.add("change");

  //get number display
  const background = block.querySelector(".top_bg");
  const mover = block.querySelector(".top_mover");
  const back = block.querySelector(".top_back");
  const btm = block.querySelector(".btm_num");

  background.innerHTML = seconds;
  back.innerHTML = seconds;

  block.ontransitionend = () => {
    top_mover.classList.remove("change");
    btm_block.classList.remove("change");
    mover.innerHTML = seconds;
    btm.innerHTML = seconds;
  };
};

export const timer = () => {
  // set start and end time
  const startTime = setStartTime();
  const endTime = setEndTime(startTime);

  //set starting  values
  let tenthHours = 0;
  let singleHours = 0;
  let tenthMinutes = 0;
  let singleMinutes = 0;
  let tenthSeconds = 0;

  // update time every second
  setInterval(() => {
    const updatedTime = new Date();

    const timer = getRemainingTime(startTime, endTime, updatedTime);

    const measureTime = {
      tenthHours: Math.floor(timer.time.hours / 10),
      singleHours: 1,
      tenthMinutes: Math.floor(timer.time.minutes / 10),
      singleMinutes:
        timer.time.minutes - Math.floor(timer.time.minutes / 10) * 10,
      tenthSeconds: Math.floor(timer.time.seconds / 10),
      singleSeconds:
        timer.time.seconds - Math.floor(timer.time.seconds / 10) * 10,
    };

    //changeNumbers(timer.time.seconds);
    //print(`${measureTime.tenthMinutes}${measureTime.singleMinutes}`);

    if (tenthHours != measureTime.tenthHours && measureTime.tenthHours > -1) {
      changeNumbers(measureTime.tenthHours, "#tenth_hours");
      tenthHours = measureTime.tenthHours;
    }

    if (singleHours != measureTime.singleHours && measureTime.tenthHours > -1) {
      changeNumbers(measureTime.singleHours, "#single_hours");
      singleHours = measureTime.singleHours;
    }

    if (
      tenthMinutes != measureTime.tenthMinutes &&
      measureTime.tenthMinutes > -1
    ) {
      changeNumbers(measureTime.tenthMinutes, "#tenth_minutes");
      tenthMinutes = measureTime.tenthMinutes;
    }

    if (
      singleMinutes != measureTime.singleMinutes &&
      measureTime.tenthMinutes > -1
    ) {
      changeNumbers(measureTime.singleMinutes, "#single_minutes");
      singleMinutes = measureTime.singleMinutes;
    }

    if (
      tenthSeconds != measureTime.tenthSeconds &&
      measureTime.tenthSeconds > -1
    ) {
      changeNumbers(measureTime.tenthSeconds, "#tenth_seconds");
      tenthSeconds = measureTime.tenthSeconds;
    }
    if (measureTime.tenthSeconds > -1)
      changeNumbers(measureTime.singleSeconds, "#single_seconds");

    if (timer.percent > 0 && timer.percent <= 100)
      document.title = `${timer.time.timer} (${timer.percent}%)`;
    else document.title = `You can go home now.`;
  }, 1000);
};
