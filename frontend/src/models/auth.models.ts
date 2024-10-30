import { DefaultResponse } from '@models/common.api.models.ts';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address?: string;
}

export type IRegisterResponse = DefaultResponse;

export interface IGetProfileResponse {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  email: string;
  orders: unknown[];
}