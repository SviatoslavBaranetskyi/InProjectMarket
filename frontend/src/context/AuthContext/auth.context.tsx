import * as React from 'react';
import { IAuthContext } from './auth.context.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';
import { AuthApi } from '@api/auth.api.ts';
import { IGetProfileResponse, ILoginRequest, IRegisterRequest } from '@models/auth.models.ts';
import { setAccessToken } from '@utils/local-storage.service.ts';

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [profileData, setProfileData] =
    React.useState<IGetProfileResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<RequestStatus>(
    RequestStatus.PENDING
  );

  const getProfile = async (signal?: AbortSignal) => {
    try {
      setStatus(RequestStatus.PENDING);

      const profileData = await AuthApi.getProfile(signal);

      setProfileData(profileData);
    } finally {
      setStatus(RequestStatus.INACTIVE);
    }
  };

  const login = async (body: ILoginRequest) => {
    try {
      setStatus(RequestStatus.PENDING);

      const response = await AuthApi.login(body);

      setAccessToken(response.access);
      await getProfile();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setStatus(RequestStatus.INACTIVE);
    }
  };

  const register = async (body: IRegisterRequest) => {
    try {
      setStatus(RequestStatus.PENDING);

      const response = await AuthApi.register(body);

      setAccessToken(response.access);
    } catch(err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setStatus(RequestStatus.INACTIVE);
    }
  }

  React.useEffect(() => {
    const controller = new AbortController();

    getProfile(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const context = React.useMemo(
    () => ({
      profileData,
      status,
      error,
      login,
      register,
    }),
    [profileData, status, error]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Auth context is not defined');
  }

  return context;
}