import axios, { AxiosRequestHeaders } from 'axios';
import { getAccessToken } from '@utils/local-storage.service.ts';
import AxiosMockAdapter from 'axios-mock-adapter';
import { applyMockInterceptors } from '@utils/mocked-axios.ts';

const mock = new AxiosMockAdapter(axios);

applyMockInterceptors(mock);

const instance = axios.create({
  baseURL: '',
});

instance.interceptors.request.use(async config => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

export default instance;
