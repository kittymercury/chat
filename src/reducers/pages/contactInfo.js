import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.contactInfo, action) => {
  switch (action.type) {
    case Types.GET_CONTACT_INFO:
      return { user: action.payload };
  }

  return state;
}
