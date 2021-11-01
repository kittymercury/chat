import lodash from 'lodash';

import { getAttachmentUrl, uploadAttachments } from './api';

export function getImg(attachment) {
  const url = getAttachmentUrl(attachment);
  console.log({attachment, url});
  return url || require(`./images/no-avatar.png`);
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

export const openFileDialog = (model, record, options = {}) => {
  const fileInput = document.createElement('input');
  options = {
    multiple: false,
    context: {},
    ...(options || {})
  };
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('multiple', options.multiple);
  fileInput.onchange = async (e) => {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push({file: e.target.files.item(i), context: options.context});
    }

    await uploadFiles(model, record, files)
  }
  fileInput.click();
};

function uploadFiles(model, record, files) {
  const filesToStore = [];
  let overallSize = 0;
  const formatsInput = lodash.uniq(lodash.map(files, (file) => getFileFormat(file.file.name)));
  const formatsAllowed = ['png', 'jpeg', 'jpg'];
  const formatsNotAllowed = lodash.difference(formatsInput, formatsAllowed);
  if (formatsNotAllowed.length) {
    // Messenger.error({
    //   content: i18n.t('file_format_is_not_allowed', {format: formatsNotAllowed.join(', ')})
    // });
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    overallSize = overallSize + file.file.size;
  }

  // overal size shoule be less than 100Mb
  if ((overallSize >> 20) > 100) {
    // Messenger.error({
    //   content: i18n.t('allowed_only_100_mb_to_download', {defaultValue: 'You can download files less than 100Mb'})
    // });
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    window.blobStore.put(file.file.name, file);
    filesToStore.push({fileName: file.file.name});
  }

  return uploadAttachments(model, record, filesToStore)
};

function getFileFormat(fileName) {
  return fileName
    ? (/[^./\\]*$/.exec(fileName) || [''])[0].toLowerCase()
    : 'error';
};
