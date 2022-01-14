import * as Types from './types';

import api from '../../api';

export const goToRegistrationPage = (payload) => {
  return { type: Types.GO_TO_REGISTRATION_PAGE, payload };
}

export const login = async (payload) => {
  console.log({payloadLogin: payload});
  const data = await api('login', payload);

  if (data.error) {
    // this.handleOpenPopUp({
    //   message: data.error.description,
    // });
  }

  if (data.user) {
    payload.user = data.user;
    payload.records = await init(data.user);

    // browserHistory.push('/chats');
  }

  return { type: Types.LOGIN, payload }
}

async function init(user) {
  const { users = [] } = await api('get_users', { id: user.id });
  user = users[0];
  // if (!user) {
  //   return browserHistory.push('/authentication');
  // };
  if (!user) return;

  const knownUsers = [ ...(user.contacts || []) ];

  const dataChats = await api('get_chats', user);
  dataChats.chats.forEach((c) => {
    c.participants.forEach((id) => {
      if (id === user.id) return;
      if (!knownUsers.includes(id)) {
        knownUsers.push(id)
      }
    })
  });
  const dataUsers = await api('get_users', { id: knownUsers });
  const currentUserChats = [];

  dataChats.chats.forEach((c) => {
    if (c.participants.includes(user.id)) {
      currentUserChats.push(c.id);
    }
  })

  const dataMessages = await api('get_messages', { id: currentUserChats } );

  return {
    users: dataUsers.users,
    chats: dataChats.chats,
    messages: dataMessages.messages,
  };
}
