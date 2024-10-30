import axios from '@utils/axios';
import {
  IGetProfileResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from '@models/auth.models.ts';

export namespace AuthApi {
  export const login = async (
    body: ILoginRequest,
    signal?: AbortSignal
  ): Promise<ILoginResponse> => {
    return axios
      .post<ILoginResponse>('auth/login', { body, signal })
      .then(res => res.data);
  };

  export const register = async (
    body: IRegisterRequest,
    signal?: AbortSignal
  ): Promise<ILoginResponse> => {
    return axios
      .post<ILoginResponse>('auth/register', { body, signal })
      .then(res => res.data);
  };

  export const getProfile = async (signal?: AbortSignal): Promise<IGetProfileResponse> => {
    return axios
      .get<IGetProfileResponse>('auth/profile', { signal })
      .then((res) => res.data);
  }
}
