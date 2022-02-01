import * as Types from './types';

export const changeErrorMessage = (payload) => {
  return { type: Types.CHANGE_ERROR_MESSAGE, payload }
}

export const clearErrorMessage = (type) => {
  return { type: Types.SEARCH_USERS, payload: type }
}

export const searchUsers = (payload) => {
  return { type: Types.SEARCH_USERS, payload }
}

export const getCurrentUserData = (payload) => {
  return { type: Types.GET_CURRENT_USER_DATA, payload }
}

export const logOut = () => {
  return { type: Types.LOG_OUT }
}

export const changeTheme = (theme) => {
  return { type: Types.CHANGE_THEME, payload: theme }
}

export const getUserData = (user) => {
  return { type: Types.GET_USER_DATA, payload: user }
}
//
export const updateCurrentUser = (user) => {
  return { type: Types.UPDATE_CURRENT_USER, payload: user }
}

// profile
export const confirmNewPassword = () => {
  return { type: Types.CONFIRM_NEW_PASSWORD }
}

export const openAvatarMenu = () => {
  return { type: Types.OPEN_AVATAR_MENU }
}

export const closeAvatarMenu = () => {
  return { type: Types.CLOSE_AVATAR_MENU }
}

export const changeHelpMessage = (payload) => {
  return { type: Types.CHANGE_HELP_MESSAGE, payload }
}

export const clearHelpMessage = () => {
  return { type: Types.CLEAR_HELP_MESSAGE }
}

//

export const cancelForwardMessage = () => {
  return { type: Types.CANCEL_FORWARD_MESSAGE }
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
