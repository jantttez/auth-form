export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfig }
  : {
      Params: Params;
      config?: AxiosRequestConfig;
    };
