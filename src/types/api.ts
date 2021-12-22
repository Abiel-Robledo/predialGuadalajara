import { AxiosError } from 'axios';

interface CommonResponse {
  status: boolean;
  message?: string;
  data?: unknown;
}

interface _Error extends Partial<Error> {
  message: string;
}

type ApiError = AxiosError<CommonResponse> | _Error;

export type {
  ApiError,
  CommonResponse,
};
