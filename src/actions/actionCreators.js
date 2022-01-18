import * as Types from './types';

export const updateCurrentUser = (payload) => {
  return { type: Types.UPDATE_CURRENT_USER, payload }
}

export const init = (payload) => {
  return { type: Types.INIT, payload }
}

// input
export const changeInputValue = (payload) => {
  return { type: Types.CHANGE_INPUT_VALUE, payload }
}

export const changePasswordVisibility = (payload) => {
  return { type: Types.CHANGE_PASSWORD_VISIBILITY, payload }
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
export const editProfile = () => {
  return { type: Types.EDIT_PROFILE }
}

export const cancelEditProfile = (payload) => {
  return { type: Types.CANCEL_EDIT_PROFILE, payload }
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
