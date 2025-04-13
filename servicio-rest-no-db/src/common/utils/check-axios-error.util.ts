import { AxiosError } from 'axios';

export function CheckAxiosError(err: any) {
  if (err instanceof AxiosError) {
    const statusCode = err.status;
    const message = err.response?.data?.message;

    return { statusCode, message };
  }

  return null;
}
