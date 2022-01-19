import * as RecordsTypes from '../actions/records/types';
import initialState from './initialState';

export default (state = initialState.selectedMessages, action) => {
  switch (action.type) {
    case RecordsTypes.DELETE_RECORDS:
    case RecordsTypes.UPDATE_RECORDS:
      return { selectedMessages: [] };
  }

  return state;
}
