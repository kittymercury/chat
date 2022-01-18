import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.settings, action) => {
  switch (action.type) {
    case Types.EDIT_PROFILE:
      return { ...state, isEditMode: true };
  }

  return state;
}
