import { InternalAxiosRequestConfig } from "axios";

export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
