import * as Types from './types';

// Chats
export const openChat = (chat) => {
  return { type: Types.OPEN_CHAT, payload: chat }
}

export const deleteChat = (chat) => {
  return { type: Types.DELETE_CHAT, payload: chat }
}

// Contacts
export const openContactInfo = (user) => {
  return { type: Types.OPEN_CONTACT_INFO, payload: user }
}

// Popup
export const openPopup = (popup) => {
  return { type: Types.OPEN_POPUP, payload: popup }
}

export const closePopup = (popup) => {
  return { type: Types.CLOSE_POPUP, payload: popup }
}

// Settings
export const openSubmenu = (id) => {
  return { type: Types.OPEN_SUBMENU, payload: id }
}
