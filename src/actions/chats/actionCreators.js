import * as Types from './types';

export const openChat = (chat) => {
  return { type: Types.OPEN_CHAT, payload: chat }
}

export const deleteChat = (chat) => {
  return { type: Types.DELETE_CHAT, payload: chat }
}
