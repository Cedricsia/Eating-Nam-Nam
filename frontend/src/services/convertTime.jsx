function convertTime(num) {
  const h = Math.floor(num / 60);
  const m = num % 60;
  if (m === 0) {
    return `${h} h`;
  }
  if (h === 0) {
    return `${m} min`;
  }

  return `${h} h ${m} min`;
}

export default convertTime;
