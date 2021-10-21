import axios from 'axios';
import * as https from 'https';

const API_URL = 'http://51.15.244.70/api/v1/web_service/call/tgc';
const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
});

export default async (action, payload) => {
  const params = {
    action: action,
    payload: payload
  }
  const user = localStorage.getItem('user');
  if (user) {
    params.user = JSON.parse(user).id;
  }
  const response = await api.get(API_URL, { params });
  return response.data;
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
