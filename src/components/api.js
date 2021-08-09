import axios from 'axios';

const API_URL = 'https://app.beatmeat.io/api/v1/web_service/call/tgc';

export default async (action, payload) => {
  const response = await axios.get(API_URL, {
    params: {
      action: action,
      payload: payload
    }
  });
  return response.data;
}
