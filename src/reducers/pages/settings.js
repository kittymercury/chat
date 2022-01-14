import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.settings, action) => {
  switch (action.type) {
    case Types.TOGGLE_EDIT_PROFILE_MODE:
      return { ...state, isEditMode: action.payload };
    case Types.TOGGLE_SETTINGS_NAV_ACTIVITY:
      return { ...state, isNavActive: action.payload };
  }

  return state;
}
