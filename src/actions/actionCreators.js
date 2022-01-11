import * as Types from './types';

// input value
export const changeInputValue = (payload) => {
  return { type: Types.CHANGE_INPUT_VALUE, payload }
}

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
export const toggleEditMode = (bool) => {
  return { type: Types.TOGGLE_EDIT_MODE, payload: bool }
}

// InputSearch
export const openSearch = (payload) => {
  return { type: Types.OPEN_SEARCH, payload }
}

export const closeSearch = () => {
  return { type: Types.CLOSE_SEARCH }
}

export const changeSearchValue = (value) => {
  return { type: Types.CHANGE_SEARCH_VALUE, payload: value }
}
