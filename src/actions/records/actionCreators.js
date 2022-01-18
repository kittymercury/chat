import * as Types from './types';

export const createRecords = (model, record, state) => {
  const records = state.records[model].concat(record);

  return { type: Types.CREATE_RECORDS, payload: { model, records } }
}

export const updateRecords = (model, record, state) => {
  const records = state.records[model].map((r) => {
    return (r.id === record.id) ? record : r;
  });

  return { type: Types.UPDATE_RECORDS, payload: { model, records } }
}

export const deleteRecords = (model, record, state) => {
  const records = state.records[model].filter((r) => r.id !== record.id);

  return { type: Types.DELETE_RECORDS, payload: { model, records } }
}
