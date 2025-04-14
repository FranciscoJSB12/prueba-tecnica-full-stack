import { localStorageKeys } from "../constants/localStorageKeys";

export const getSessionId = () => {
  const sessionId = localStorage.getItem(localStorageKeys.SESSION_ID);

  if (sessionId) return sessionId;

  return "";
};
