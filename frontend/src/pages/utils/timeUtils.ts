export const createTimePassedInfo = (date: string) => {
  const differenceInMills = Math.trunc(new Date().getTime() - new Date(date).getTime());

  const minutes = Math.trunc(differenceInMills / (1000 * 60));
  const hours = Math.trunc(differenceInMills / (1000 * 60 * 60));
  const days = Math.trunc(differenceInMills / (1000 * 60 * 60 * 24));
  const months = Math.trunc(days / 31);
  const years = Math.trunc(months / 12);

  if (!years && !months && !days && !hours) return `${minutes}min`;
  if (!years && !months && !days) return `${hours}h`;
  if (!years && !months) return `${days}d`;
  if (!years) return `${months}m`;
  return `${years}y`;
};

export const createStyledDateInfo = (date: string) => {
  if (!date) {
    return '';
  }
  const time = new Date(date);

  const hourStyled = addLeadingZeroToTime(time.getHours());
  const minuteStyled = addLeadingZeroToTime(time.getMinutes());
  return `${time.toLocaleDateString()} at ${hourStyled}:${minuteStyled}`;
};

const addLeadingZeroToTime = (time: number) => {
  return time < 10 ? `0${time}` : time;
};
