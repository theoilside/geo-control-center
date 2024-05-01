import type { AxiosRequestConfig } from "axios";
import Axios from "axios";
import { stringify } from "qs";

const AXIOS_INSTANCE = Axios.create({
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: "comma" }),
  },
});

// Возможно, костыль ↓
interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

export const customInstance = <T>(config: AxiosRequestConfig): CancelablePromise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  ) as CancelablePromise<T>;

  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};
