import lodash from 'lodash';

import noAvatarImage from './images/no-avatar.png';

export function getImg(url) {
  return url || noAvatarImage;
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const getZero = (time) => time < 10
    ? 0
    : '';

  return `${getZero(hours)}${hours}:${getZero(minutes)}${minutes}`
}

export function getFileFormat(fileName) {
  return fileName
    ? (/[^./\\]*$/.exec(fileName) || [''])[0].toLowerCase()
    : 'error';
};
