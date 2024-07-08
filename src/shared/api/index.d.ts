import { AxiosRequestConfig } from 'axios';

export type AxiosConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfig }
  : {
      Params: Params;
      config?: AxiosRequestConfig;
    };
