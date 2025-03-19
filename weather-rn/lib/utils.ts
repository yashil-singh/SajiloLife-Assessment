export const formatTime = (date: Date) => {
  const hours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${period}`;
};

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  });

  return formatter.format(date);
};

export const getTimeDifference = (date: Date) => {
  const now = new Date();
  const target = new Date(date);

  const diffInMs = target.getTime() - now.getTime();
  const diffInMins = Math.round(diffInMs / (1000 * 60));

  if (diffInMins === 0) return `Just now`;

  const minutes = Math.abs(diffInMins);

  if (minutes < 60) {
    return diffInMins > 0
      ? `in ${minutes} ${minutes > 1 ? "minutes" : "minute"}`
      : `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  }

  const hours = Math.round(minutes / 60);

  return diffInMins > 0
    ? `in ${hours} ${hours > 1 ? "hours" : "hour"}`
    : `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
};
