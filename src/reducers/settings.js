import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case Types.TOGGLE_EDIT_MODE:
      return { ...state, isEditMode: action.payload };
  }

  return state;
}
