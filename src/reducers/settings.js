// import * as Types from '../actions/settings/types';
import initialState from './initialState';

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case Types.OPEN_SUBMENU:
      return {
        ...state,
        activeSubmenu: (action.payload === state.activeSubmenu) ? null : action.payload } };
  }

  return state;
}
