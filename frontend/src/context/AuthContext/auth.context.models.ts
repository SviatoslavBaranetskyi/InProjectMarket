import { IGetProfileResponse, ILoginRequest, IRegisterRequest } from '@models/auth.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';

export interface IAuthContext {
  status: RequestStatus,
  profileData: IGetProfileResponse | null,
  error: string | null,
  login: (body: ILoginRequest) => Promise<void>;
  register: (body: IRegisterRequest) => Promise<void>;
}