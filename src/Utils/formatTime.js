export const formatTime = (time) => {
  // hours, minutes and seconds
  const hrs = Math.floor(~~(time / 3600));
  const mins = Math.floor(~~((time % 3600) / 60));
  const secs = Math.floor(~~time % 60);

  let ret = '';

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? '0' : ''}`;
  }
  ret += `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};
// Formated time in human readable format (hours, minutes, seconds)
export const formatHumanReadTime = (time) => {
  const formatedTime = formatTime(time);
  const timeArr = formatedTime.split(':').map((time) => {
    parseFloat(time);
  });
  let string = '';
  let minutes;
  let seconds;
  if (timeArr.length > 2) {
    string += `${timeArr[0]} ${timeArr[0] > 1 ? 'hours' : 'hour'}, `;
    minutes = timeArr[1];
    seconds = timeArr[2];
  } else {
    minutes = timeArr[0];
    seconds = timeArr[1];
  }
  string += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}, `;
  string += `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;
  return string;
};
