export const enum RequestStatus {
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export type DefaultResponse<T = {}> = {
  message: string;
} & T;