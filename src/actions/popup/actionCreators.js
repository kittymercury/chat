import * as Types from './types';

export const openPopup = (popup) => {
  return { type: Types.OPEN_POPUP, payload: popup }
}

export const closePopup = (popup) => {
  return { type: Types.CLOSE_POPUP, payload: popup }
}
