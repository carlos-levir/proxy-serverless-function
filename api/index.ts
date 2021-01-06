import { NowRequest, NowResponse } from '@vercel/node';
import api from '../src/services/api';

export default async (request: NowRequest, response: NowResponse) => {
  try {
    const { data, status } = await api.post(`/${request.query.name}`, {
      ...request.body,
    });

    response.status(status).send(data);
  } catch (err) {
    if (err.response) {
      return response.status(err.response.status).send(err.response.data);
    }

    return response.status(500).send(err.message);
  }
};
