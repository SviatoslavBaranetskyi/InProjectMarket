import { useAuth } from '@context/AuthContext/auth.context.tsx';

export const useIsAuthorized = () => {
  const { profileData } = useAuth();

  return profileData !== null;
};
