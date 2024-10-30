const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (value: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, value);
};
