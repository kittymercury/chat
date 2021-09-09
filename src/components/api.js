import axios from 'axios';
import * as https from 'https';

const API_URL = 'http://51.15.244.70/api/v1/web_service/call/tgc';
const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
});

export default async (action, payload) => {
  const response = await api.get(API_URL, {
    params: {
      action: action,
      payload: payload
    }
  });
  return response.data;
}
