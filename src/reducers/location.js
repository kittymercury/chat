import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.location, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return action.payload;
  }

  return state;
}
