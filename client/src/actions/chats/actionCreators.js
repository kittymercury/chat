import * as Types from './types';

export const someAction = (value) => {
  return { type: Types.CHANGE_SEARCH_VALUE, payload: value }
}
