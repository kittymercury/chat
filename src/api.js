import axios from 'axios';
import * as https from 'https';

const API_BASE_URL = 'https://beatmeat.plasticine.ml';
const API_URL = `${API_BASE_URL}/api/v1/web_service/call/tgc`;
export const apiInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
});

export default async function api(action, payload) {
  if (action === 'upload_attachment') {
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    const data = new FormData()
    data.append(`file`, payload.file, payload.name);
    return apiInstance.post(`${API_BASE_URL}/api/v1/storage/${payload.model}/${payload.record}`, data, config);
  }

  const params = {
    action: action,
    payload: payload
  }
  const user = localStorage.getItem('reduxPersist:currentUser');

  if (user) {
    params.user = JSON.parse(user).id;
  }
  const response = await apiInstance.get(API_URL, { params });
  return response.data;
}

// export default api

export function getAttachmentUrl(attachment = {}) {
  if (attachment.id && attachment.file_name) {
    return `${API_BASE_URL}/api/v1/storage/${attachment.id}/${attachment.file_name}`;
  }
}

// yaml

// actions:

//   login:
//     request params:
//       login
//       password
//     response:
//       user || error
//
//   sign_up:
//     request params:
//       name
//       login
//       password
//     response:
//       user || error
//
//   get_users:
//     request params:
//     response:
//       users || error
//
//   get_chats:
//     request params:
//       user           // currentUser
//     response:
//       chats || error
//
//   create_chat:
//     request params:
//       chat:
//         participants:
//           - currentUserId
//           - userId
//     response:
//       chat || error
//
//   delete_chat:
//     request params:
//       chat
//     response:
//       deleted || error




// add api actions:

//   create_message:
//     request params:
//       userId
//       chatId
//       content
//       reply
//     response:
//       message || error
//
//   get_messages:
//     request params:
//       chatId
//       userId       // currentUser.idea
//     response:
//       messages || error
//
//   delete_message:
//     request params:
//       message
//     response:
//       deleted || error
//
//   update_message:
//     request params:
//       messageId
//       content
//     response:
//       edited || error   // look at updated_at

  // update_user:
  //   request params:
  //     id
  //     login
  //     password
  //     name
  //     avatar
  //   response:
  //     user || error
