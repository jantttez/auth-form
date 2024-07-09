import { AxiosRequestConfig } from 'axios';

export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfig }
  : {
      params: Params;
      config?: AxiosRequestConfig;
    };
