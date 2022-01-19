import * as RecordsTypes from '../actions/records/types';
import initialState from './initialState';

export default (state = initialState.isSelectMode, action) => {
  switch (action.type) {
    case RecordsTypes.UPDATE_RECORDS:
      return { isSelectMode: false };
  }

  return state;
}
