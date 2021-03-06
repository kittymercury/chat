import { browserHistory } from 'react-router';

import api, { getAttachmentUrl } from '../api';

export const getRecords = async (user) => {
  const { users = [] } = await api('get_users', { id: user.id });
  user = users[0];
  if (!user) return browserHistory.push('/authentication');

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

// moved from app

export const updateCurrentUser = async (user, id) => {
  if (typeof user.avatar === 'object') {
    const { data = [] } = await api('upload_attachment', {
      file: user.avatar,
      name: 'avatar.jpeg',
      model: 'tgc_user',
      record: id,
    });
    const [ attachment ] = data;
    if (attachment) {
      user.avatar = getAttachmentUrl(attachment.attributes);
    }
  }

  const data =  await api('update_user', { id: id, ...user });

  return data;
}
