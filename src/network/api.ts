import axios, { AxiosRequestConfig } from 'axios';

type ResModel<T = any> = {
  status: number;
  data: T;
  isSuccess: boolean;
  message: string;
};

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
});

const fetcher = async (params: AxiosRequestConfig): Promise<ResModel> => {
  const response: ResModel = await instance({
    ...params,
  })
    .then((res) => ({
      status: res.status,
      data: res.data,
      isSuccess: true,
      message: '',
    }))
    .catch((e) => {
      const tmp = e.response?.data?.message ?? '';
      let message = '';
      if (typeof tmp === 'string') {
        message = tmp;
      } else if (Array.isArray(tmp)) {
        message = tmp.join(', ');
      }

      return {
        status: e.response?.data?.statusCode ?? 500,
        message,
        data: {},
        isSuccess: false,
      };
    });

  return response;
};

export type { ResModel };
export { fetcher };
