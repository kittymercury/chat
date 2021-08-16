export function getImg(fileName) {
  console.log(fileName);
  return fileName
    ? require(`./tg-imgs/${fileName}`)
    : require(`./tg-imgs/no-avatar.png`);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const getZero = (time) => time < 10 ? 0 : '';

  return `${getZero(hours)}${hours}:${getZero(minutes)}${minutes}`
}
